import { Task } from '../generated/prisma/client';
import { Status } from '../generated/prisma/enums';
import { prisma } from '../lib/prisma';
import { createError } from '../utils/AppError';

export const getAllTasksService = async (status?: Status) => {
  const result = status
    ? await prisma.task.findMany({
        where: { status },
        orderBy: { createdAt: 'desc' },
      })
    : await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
      });

  if (!result || result.length === 0) {
    throw createError('No tasks found with the specified status.', 404);
  }
  return result;
};

export const getTaskByIdService = async (id: string) => {
  const result = await prisma.task.findUnique({
    where: { id },
  });
  if (!result) {
    throw createError(`Task with ID ${id} not found.`, 404);
  }
  return result;
};

export const createTaskService = async (data: Task) => {
  return await prisma.task.create({
    data,
  });
};

export const updateTaskService = async (id: string, data: Task) => {
  const taskExists = await prisma.task.findUnique({ where: { id } });
  if (!taskExists) {
    throw createError(`Cannot update. Task with ID ${id} not found.`, 404);
  }
  return await prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTaskService = async (id: string) => {
  const taskExists = await prisma.task.findUnique({ where: { id } });
  if (!taskExists) {
    throw createError(`Cannot delete. Task with ID ${id} not found.`, 404);
  }
  return await prisma.task.delete({
    where: { id },
  });
};
