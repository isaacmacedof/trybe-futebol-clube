import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];
  console.log(jwt.verify(token));
  const isAuth = jwt.verify(token);
  if (isAuth === 'Token must be a valid token') {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateJWT;
