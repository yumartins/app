import { UserHandles } from '@types';
import { Context } from 'koa';

import { prisma } from '../../prisma';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    const user = await prisma.user.findMany({
      where: {
        company_id: id,
      },
    });

    ctx.status = 200;

    ctx.body = user;
  },

  create: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    const {
      name,
      email,
      phone,
    } = ctx.request.body as UserHandles;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) ctx.throw(400, 'User already registered.');

    const me = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        company_id: id as string,
      },
    });

    ctx.status = 201;

    ctx.body = me;
  },
};

export default users;
