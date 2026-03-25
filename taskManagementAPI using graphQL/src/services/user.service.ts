import { User } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { createError } from '../utils/AppError';

export const getAllUsersService = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!result || result.length === 0) {
    throw createError('No users found.', 404);
  }
  return result;
};

export const getUserByIdService = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!result) {
    throw createError(`User with ID ${id} not found.`, 404);
  }
  return result;
};

export const createUserService = async (data: User) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
export const updateUserByIdService = async (id: string, data: User) => {
  const userExists = await prisma.user.findUnique({ where: { id } });
  if (!userExists) {
    throw createError(`Cannot update. User with ID ${id} not found.`, 404);
  }
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUserByIdService = async (id: string) => {
  const userExists = await prisma.user.findUnique({ where: { id } });
  if (!userExists) {
    throw createError(`Cannot delete. User with ID ${id} not found.`, 404);
  }
  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};
