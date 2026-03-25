import { Request, Response } from 'express';
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
} from '../services/user.service';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  sendSuccess(res, users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await getUserByIdService(id);
  sendSuccess(res, user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await createUserService(req.body);
  sendSuccess(res, result, 201);
});
export const updateUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await updateUserByIdService(id, req.body);
  sendSuccess(res, result);
});

export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await deleteUserByIdService(id);
  sendSuccess(res, result);
});
