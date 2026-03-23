import { prisma } from '../lib/prisma';

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
};
