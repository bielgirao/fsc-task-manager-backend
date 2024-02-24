const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find();
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                this.res.status(404).send('Task not found.');
            }

            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async createTask() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send({
                message: 'Task created successfully.',
                newTask,
            });
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);
            if (!taskToDelete) {
                return this.res.status(404).send('Task not found.');
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send({
                message: 'Task deleted successfully.',
                deletedTask,
            });
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
