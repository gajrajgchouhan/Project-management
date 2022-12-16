const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Team", teamSchema);
