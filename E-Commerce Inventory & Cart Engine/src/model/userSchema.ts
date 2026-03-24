import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

const User = model('User', userSchema, 'users');
export default User;
