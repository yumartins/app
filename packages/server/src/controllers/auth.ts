import {
  AuthHandles,
  UserHandles,
  TypesHandles,
  CompanyHandles,
} from '@types';
import { Context } from 'koa';

import { prisma } from '../../prisma';
import { generate } from '../auth';
import { bcrypt } from '../helpers';

const auth = async (ctx: Context): Promise<void> => {
  const {
    type,
  } = ctx.query;

  const {
    email,
    password,
  } = ctx.request.body as AuthHandles;

  const response = async (user: UserHandles | CompanyHandles, typed: TypesHandles) => {
    if (! user) ctx.throw(400, 'Unregistered email.');

    if (typed === 'COMPANY') {
      const match = await bcrypt.compare(password || '', user.password);

      if (! match) ctx.throw(401, 'Incorrect password.');
    }

    const {
      id,
    } = user;

    const token = generate({
      id,
      type: type as TypesHandles,
    });

    ctx.status = 200;

    ctx.body = {
      token,
    };
  };

  if (type === 'USER') {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    response(user as UserHandles, type);
  }

  if (type === 'COMPANY') {
    const user = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    response(user as CompanyHandles, type);
  }
};

export default auth;
