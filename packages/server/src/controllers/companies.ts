import { CompanyHandles } from '@types';
import { Context } from 'koa';

import { prisma } from '../../prisma';

const companies = {
  list: async (ctx: Context): Promise<void> => {
    const company = await prisma.company.findMany();

    ctx.status = 200;

    ctx.body = company;
  },

  create: async (ctx: Context): Promise<void> => {
    const {
      name,
      email,
      phone,
      document,
    } = ctx.request.body as CompanyHandles;

    const user = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (user) ctx.throw(400, 'Company already registered.');

    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
        password: '',
        document,
      },
    });

    ctx.status = 201;

    ctx.body = company;
  },
};

export default companies;
