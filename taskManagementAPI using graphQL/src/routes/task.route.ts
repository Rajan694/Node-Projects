import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/task.controller';

import { Router } from 'express';

const taskRouter = Router();

taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id', updateTask);
taskRouter.delete('/tasks/:id', deleteTask);

export default taskRouter;
