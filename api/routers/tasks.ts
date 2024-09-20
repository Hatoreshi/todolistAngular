import express from 'express';
import Task from '../models/Task';

const taskRouter = express.Router();

taskRouter.post('/', async (req, res, next) => {
  try {
    const task = new Task({
      title: req.body.title,
      status: req.body.status,
    });

    await task.save();
    return res.send(task);
  } catch (error) {
    return next(error);
  }
});

taskRouter.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find();

    return res.send(tasks);
  } catch (error) {
    return next(error);
  }
});

taskRouter.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).send({ error: 'Task does not exist' });
    }

    const updateFields = { ...req.body };

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true },
    );

    if (updatedTask) {
      await updatedTask.save();
    } else {
      return res.status(400).send({ error: 'Task does not exist' });
    }

    return res.send(updatedTask);
  } catch (error) {
    return next(error);
  }
});


taskRouter.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).send({ error: 'Task does not exist' });
    }

    await Task.deleteOne({ _id: req.params.id });
    res.send('deleted');
  } catch (error) {
    return next(error);
  }
});

export default taskRouter;
