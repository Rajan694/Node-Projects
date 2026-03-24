import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from './generateToken';
import Login from '../model/login.schema';

interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    // Ensure this token is still stored in the login collection and not expired
    const session = await Login.findOne({ token });
    if (!session) {
      return res.status(403).send('Session expired or invalid');
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send('Invalid token');
  }
};

export const authorizeUserOrAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send('Access denied');
  }

  const { id: userId, role } = req.user;
  const { id: paramId } = req.params;

  if (role === 'admin' || userId === paramId) {
    return next();
  }

  return res.status(403).send('Forbidden');
};

export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send('Access denied');
  }

  const { role } = req.user;

  if (role === 'admin') {
    return next();
  }

  return res.status(403).send('Forbidden');
};
