import { Task } from '../generated/prisma/client';
import { Status } from '../generated/prisma/enums';
import { prisma } from '../lib/prisma';
import { createError } from '../utils/AppError';

export const getAllTasksService = async (status?: Status, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const whereClause = status ? { status } : {};

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.task.count({
      where: whereClause,
    }),
  ]);

  return { tasks, total };
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
