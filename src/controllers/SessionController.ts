import { Request, Response } from 'express';

import { User } from '../models';

import { Sha3Factory } from '../services/UtilityServices';
import JwtSignService from '../services/JwtSignService';

const SessionController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password || email.length < 5)
      return res.status(400).send({ message: 'E-mail ou senha inválido' });

    const user = await User.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        },
        password: Sha3Factory(password)
      }
    });

    if (!user)
      return res.status(404).send({ message: 'Usuário ou senha incorreta' });

    const claims = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    const authorizationKey = JwtSignService(claims);

    return res.json({ authorizationKey });
  }
};

export default SessionController;
