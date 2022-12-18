const userModel = require("../../models/user");
const project = require("../../models/project");
const taskModel = require("../../models/task");
const teamModel = require("../../models/team");
const { default: mongoose } = require("mongoose");

const StreamChat = require("stream-chat").StreamChat;
const stream = require("getstream");

const serverStreamClient = stream.connect(
    process.env.API_KEY,
    process.env.API_SECRET
);

const serverChatClient = StreamChat.getInstance(
    process.env.API_KEY,
    process.env.API_SECRET
);

exports.addProjectService = async (req, res, next) => {
    const { name, description, team } = req.body;

    const user = await userModel
        .findById(res.locals.user.id, { username: 1 })
        .exec();

    // team is an array of emails
    const userIds = await Promise.all(
        team.map(async (username) => {
            const user = await userModel.exists({ username }).exec();
            if (user === null) {
                return Error(`User ${username} not found`);
            }
            return user._id;
        })
    );

    if (userIds.filter((id) => id instanceof Error).length > 0) {
        return res.status(400).json({ message: "Invalid usernames" });
    }

    const teamId = await teamModel.create({
        members: [...userIds, res.locals.user.id],
        created_by: res.locals.user.id,
    });

    await teamId.save();

    const channel = serverChatClient.channel("messaging", {
        name,
        members: [...team, user.username],
        created_by_id: res.locals.user.id,
    });
    await channel.create();

    const newProject = new project({
        name,
        created_by: res.locals.user.id,
        description,
        team: teamId._id,
        tasks: [],
        channelId: channel.id,
    });

    await newProject.save();

    res.status(200).json({ message: "Project added successfully" });
};

exports.getAllProjectsService = async (req, res, next) => {
    console.log("getAll");
    const { user } = res.locals;

    // get id of all teams
    const teams = await teamModel
        .find(
            {
                $or: [
                    {
                        created_by: {
                            $eq: new mongoose.Types.ObjectId(user.id),
                        },
                    },
                    {
                        members: {
                            $in: [new mongoose.Types.ObjectId(user.id)],
                        },
                    },
                ],
            },
            { _id: 1 }
        )
        .exec();

    if (teams === null || teams.length === 0) {
        return res.status(200).json({ projects: [] });
    }

    // get id of all projects from teams
    const projects = await project
        .find(
            {
                $or: [{ team: { $in: teams } }],
            },
            { channelId: 0 }
        )
        .populate("team")
        .populate("team.members")
        .populate("tasks")
        .populate("created_by", { password: 0, __v: 0 })
        .exec();

    res.status(200).json({ projects });
};

exports.getOneProjectService = async (req, res, next) => {
    const { id } = req.body;
    const projectData = await project
        .findById(id)
        .populate("team")
        .populate("tasks")
        .exec();

    if (projectData === null) {
        return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project: projectData });
};

exports.updateTaskService = async (req, res, next) => {
    const { id, ...attributes } = req.body;
    const taskData = await taskModel.findByIdAndUpdate(id, attributes).exec();
    res.status(200).json({ message: "Task updated successfully" });
};

exports.getChatService = async (req, res, next) => {
    const channels = await serverChatClient.queryChannels(
        { type: "messaging", members: { $in: [res.locals.user.id] } },
        [{ last_message_at: -1 }],
        {
            watch: true, // this is the default
            state: true,
        }
    );
    res.status(200).json({
        channels: channels.map((channel) => channel.data.cid),
    });
};
