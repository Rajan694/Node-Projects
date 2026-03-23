import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.post('/users', createUser);
userRouter.put('/users/:id', updateUserById);
userRouter.delete('/users/:id', deleteUserById);

export default userRouter;
