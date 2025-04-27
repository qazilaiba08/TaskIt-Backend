import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    taskId: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    editAt: {
        type: Date,
        default: Date.now,
    },
})
const taskId = taskSchema.index({taskId: 1}, {unique: true});
taskSchema.index({ assignTo: 1 }, { unique: true });

const Task = mongoose.model('Task', taskId);
export default Task;