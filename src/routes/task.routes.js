const express = require('express');

const TaskController = require('../controllers/task.controller');
const TaskModel = require('../models/task.model');

const router = express.Router();

router.get('/', async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            res.status(404).send('Task not found.');
        }

        res.status(200).send(task);
    } catch (error) {}
});

router.post('/', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
