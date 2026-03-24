import bcrypt from 'bcryptjs';
import User from '../model/userSchema';

type UserRole = 'user' | 'admin';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export const getAllUsersService = () => {
  return User.find();
};

export const getUserByIdService = (id: string) => {
  return User.findById(id);
};

export const createUserService = async (userData: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return User.create({ ...userData, password: hashedPassword });
};

export const updateUserByIdService = async (id: string, updateData: UpdateUserInput) => {
  const dataToUpdate: UpdateUserInput = { ...updateData };

  if (updateData.password) {
    dataToUpdate.password = await bcrypt.hash(updateData.password, 10);
  }

  return User.findByIdAndUpdate(id, dataToUpdate, { new: true });
};

export const deleteUserByIdService = (id: string) => {
  return User.findByIdAndDelete(id);
};
