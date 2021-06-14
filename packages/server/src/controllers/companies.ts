import { Company } from '@types';
import { Context } from 'koa';

import { prisma } from '../prisma';

const companies = {
  // list: async (ctx: Context): Promise<void> => {},

  create: async (ctx: Context): Promise<void> => {
    const {
      name,
      email,
      phone,
    } = ctx.request.body as Company;

    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
      },
    });

    ctx.status = 201;

    ctx.body = company;
  },
};

export default companies;
