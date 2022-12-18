const userModal = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const StreamChat = require("stream-chat").StreamChat;
const stream = require("getstream");

require("dotenv").config();

console.log(process.env.API_KEY, process.env.API_SECRET);

const serverStreamClient = stream.connect(
    process.env.API_KEY,
    process.env.API_SECRET
);

const serverChatClient = StreamChat.getInstance(
    process.env.API_KEY,
    process.env.API_SECRET
);

exports.loginService = async (req, res, next) => {
    const { email, password } = req.body;
    const isUser = await userModal.findOne({ email });

    if (!isUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    console.log("user found");

    const isMatch = await bcrypt.compare(password, isUser.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    console.log("password is valid");

    const payload = {
        user: isUser.id,
    };

    const chatToken = serverStreamClient.createUserToken(isUser.username);

    console.log(chatToken);

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: 360000,
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({
                user: token,
                chatToken,
            });
        }
    );
};

exports.registerService = async (req, res, next) => {
    const { name, username, email, password } = req.body;

    const isUser = await userModal.findOne({ $or: [{ username }, { email }] });

    if (isUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModal({
        name,
        username,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    await serverChatClient.upsertUser({
        id: username,
        name,
    });

    return res.status(200).json({
        success: true,
    });
};

exports.getProfileService = async (req, res, next) => {
    const { user } = res.locals;

    const isUser = await userModal.findById(user.id).select("-password");

    if (!isUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({ id: isUser.username, name: isUser.name });
};
