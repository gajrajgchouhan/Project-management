const user = require("../../models/user");
const project = require("../../models/project");
const task = require("../../models/task");
const subtask = require("../../models/subtask");
const team = require("../../models/team");
const StreamChat = require("stream-chat").StreamChat;
const stream = require("getstream");

const serverStreamClient = stream.connect(
    process.env.API_KEY,
    process.env.API_SECRET
);

// const serverChatClient = StreamChat.getInstance(
//     process.env.API_KEY,
//     process.env.API_SECRET
// );

// const channel = serverChatClient.channel("messaging", {
//     name: "Project 1",
//     members: ["thierry", "tommaso"],
//     created_by_id: "myuserid",
// });
// await channel.create();

// const channels = await serverChatClient.queryChannels(
//     { type: "messaging", members: { $in: ["thierry"] } },
//     [{ last_message_at: -1 }],
//     {
//         watch: true, // this is the default
//         state: true,
//     }
// );

exports.addService = async (req, res, next) => {
    const { name, description, team } = req.body;
    const { user } = req.locals;
    const newProject = new project({
        name,
        description,
        user,
        team,
    });
    await newProject.save();
    res.status(200).json({ message: "Project added successfully" });
};

exports.getAllService = async (req, res, next) => {
    const { user } = req.locals;
    // get id of all teams
    const teams = await team
        .find(
            {
                $or: [{ user }, { members: { $in: [user] } }],
            },
            { _id: 1 }
        )
        .exec();
    // get id of all projects from teams
    const projects = await project
        .find({
            $or: [{ team: { $in: teams } }],
        })
        .populate("team")
        .populate("tasks");
    res.status(200).json({ projects });
};

exports.getOneService = async (req, res, next) => {
    const { user } = req.locals;
    const { id } = req.body;
    const project = await project
        .findOne({
            $or: [{ _id: id }, { user }],
        })
        .populate("team")
        .populate("tasks");
    res.status(200).json({ project });
};

exports.updateService = async (req, res, next) => {
    const { user } = req.locals;
    const { id, name, description } = req.body;
    const updatedProject = await project
        .findOneAndUpdate(
            {
                $or: [{ _id: id }, { user }],
            },
            {
                name,
                description,
            }
        )
        .exec();
    res.status(200).json({ message: "Project updated successfully" });
};
