const user = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginService = async (req, res, next) => {
    const { username, password } = req.body;
    const isUser = await user.findOne({ username });

    if (!isUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    const payload = {
        user: {
            id: isUser.id,
        },
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: 360000,
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                token,
            });
        }
    );
};

exports.registerService = async (req, res, next) => {
    const { name, username, password } = req.body;

    const isUser = await user.findOne({ username });

    if (isUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({
        name,
        username,
        password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
        success: true,
    });
};
