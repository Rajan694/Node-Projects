import { model, Schema, Types } from 'mongoose';

const loginSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      // TTL index: document will be removed automatically after this time
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Login = model('Login', loginSchema);

export default Login;
