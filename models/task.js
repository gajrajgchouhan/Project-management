const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
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
    subtasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "SubTask",
        },
    ],
});

module.exports = mongoose.model("Task", taskSchema);
