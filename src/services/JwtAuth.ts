import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import jwtKey from '../config/JwtSecret';

const JwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Acesso não autorizado' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2)
    return res.status(401).send({ message: 'Erro no token' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: 'Token mal formatado' });

  return jwt.verify(token, jwtKey || 'test', (err, decoded) => {
    if (err || !decoded)
      return res.status(401).send({ message: 'Token inválido' });

    return next();
  });
};

export default JwtAuth;
