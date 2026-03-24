import { Router } from 'express';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../controllers/user.controller';
import { authenticateToken, authorizeAdmin, authorizeUserOrAdmin } from '../middlewares/authenticate.middleware';

const userRouter = Router();

// Public route
userRouter.post('/users', createUser);

// All routes below this require authentication
userRouter.use(authenticateToken);

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', authorizeUserOrAdmin, updateUserById);
userRouter.delete('/users/:id', authorizeAdmin, deleteUserById);

export default userRouter;
