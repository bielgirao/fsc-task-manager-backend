const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');
const TaskModel = require('./src/models/task.model');

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 8000;
app.use(express.json());

connectToDatabase();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            res.status(404).send('Task not found.');
        }

        res.status(200).send(task);
    } catch (error) {}
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send({
            message: 'Task created successfully.',
            newTask,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const taskToUpdate = await TaskModel.findById(taskId);
        const allowedUpdates = ['isCompleted'];
        const requestedUpdates = Object.keys(taskData);
        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send(
                        `The field "${update}" is not allowed to be updated.`
                    );
            }
        }
        await taskToUpdate.save();
        return res
            .status(200)
            .send({ message: 'Task updated successfully.', taskToUpdate });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToDelete = await TaskModel.findById(taskId);
        if (!taskToDelete) {
            return res.status(404).send('Task not found.');
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send({
            message: 'Task deleted successfully.',
            deletedTask,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
