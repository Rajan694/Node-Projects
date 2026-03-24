import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  role: string;
}

const generateToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
  return token;
};

export default generateToken;
