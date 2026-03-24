import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/userSchema';
import generateToken from '../middlewares/generateToken';
import Login from '../model/login.schema';

const loginRouter = Router();

loginRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password as string);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await Login.create({
    user: user._id,
    token,
    expiresAt,
  });

  return res.status(200).json({ token });
});

export default loginRouter;
