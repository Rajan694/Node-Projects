import { Task } from '../generated/prisma/client';
import { Status } from '../generated/prisma/enums';
import { prisma } from '../lib/prisma';
import { createError } from '../utils/AppError';
// import { redisClient } from '../middlewares/redis';

// const CACHE_KEY_PREFIX = 'tasks:';

// const clearTaskCache = async () => {
//   if (redisClient) {
//     try {
//       let cursor = '0';
//       do {
//         const result = await (redisClient as any).scan(cursor, {
//           MATCH: `${CACHE_KEY_PREFIX}*`,
//           COUNT: 100,
//         });

//         // Handling both possible return types from different library versions
//         const nextCursor = typeof result === 'object' ? result.cursor : result[0];
//         const keys = typeof result === 'object' ? result.keys : result[1];

//         if (keys && keys.length > 0) {
//           await redisClient.del(keys);
//         }
//         cursor = nextCursor.toString();
//       } while (cursor !== '0');
//       console.log('Cleared task cache');
//     } catch (error) {
//       console.error('Redis Clear Error:', error);
//     }
//   }
// };

export const getAllTasksService = async (status?: Status, page: number = 1, limit: number = 10) => {
  // const cacheKey = `${CACHE_KEY_PREFIX}${status || 'all'}:page:${page}:limit:${limit}`;

  // Try to get data from Redis
  // if (redisClient) {
  //   try {
  //     const cachedData = await redisClient.get(cacheKey);
  //     if (cachedData) {
  //       console.log('Serving from Redis cache');
  //       return JSON.parse(cachedData);
  //     }
  //   } catch (error) {
  //     console.error('Redis Get Error:', error);
  //   }
  // }

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

  const result = { tasks, total };

  // Store in Redis with an expiration of 1 hour
  // if (redisClient) {
  //   try {
  //     await redisClient.set(cacheKey, JSON.stringify(result), {
  //       EX: 3600, // 1 hour
  //     });
  //   } catch (error) {
  //     console.error('Redis Set Error:', error);
  //   }
  // }

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
  const newTask = await prisma.task.create({
    data,
  });
  // await clearTaskCache();
  return newTask;
};

export const updateTaskService = async (id: string, data: Task) => {
  const taskExists = await prisma.task.findUnique({ where: { id } });
  if (!taskExists) {
    throw createError(`Cannot update. Task with ID ${id} not found.`, 404);
  }
  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });
  // await clearTaskCache();
  return updatedTask;
};

export const deleteTaskService = async (id: string) => {
  const taskExists = await prisma.task.findUnique({ where: { id } });
  if (!taskExists) {
    throw createError(`Cannot delete. Task with ID ${id} not found.`, 404);
  }
  const deletedTask = await prisma.task.delete({
    where: { id },
  });
  // await clearTaskCache();
  return deletedTask;
};
