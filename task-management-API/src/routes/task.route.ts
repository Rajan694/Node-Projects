import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/task.controller';

const taskRouter = require('express').Router();

taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id', updateTask);
taskRouter.delete('/tasks/:id', deleteTask);

export default taskRouter;
