import { Request, Response } from 'express';
import {
  getAllTasksService,
  getTaskByIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from '../services/task.service';
import { Status } from '../generated/prisma/enums';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const status = req.query?.status as Status;
  const tasks = await getAllTasksService(status);
  sendSuccess(res, tasks);
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await getTaskByIdService(id as string);
  sendSuccess(res, task);
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await createTaskService(req.body);
  sendSuccess(res, result, 201);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await updateTaskService(id as string, req.body);
  sendSuccess(res, result);
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteTaskService(id as string);
  sendSuccess(res, result);
});

