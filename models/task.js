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
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: null,
    },
    complete: {
        type: Boolean,
        required: true,
        default: false,
    },
    // subtasks: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "SubTask",
    //     },
    // ],
});

module.exports = mongoose.model("Task", taskSchema);
