import { Request, Response } from 'express';
import { getAllTasks } from '../services/task.service';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found',
      });
    }
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    });
  }
};
export const getTaskById = (req: Request, res: Response) => {};
export const createTask = (req: Request, res: Response) => {};
export const updateTask = (req: Request, res: Response) => {};
export const deleteTask = (req: Request, res: Response) => {};
