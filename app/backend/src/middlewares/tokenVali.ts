import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
