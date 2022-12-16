const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    status: {
        enum: ["todo", "in-progress", "done"],
        type: String,
        default: "todo",
    },
});

module.exports = mongoose.model("SubTask", subTaskSchema);
