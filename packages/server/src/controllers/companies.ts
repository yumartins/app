import { CompanyHandles } from '@types';
import { Context } from 'koa';

import { prisma } from '../../prisma';
import { bcrypt, remove } from '../helpers';

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
      password,
      document,
    } = ctx.request.body as CompanyHandles;

    const user = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (user) ctx.throw(400, 'Company already registered.');

    const hash = await bcrypt.hash(password);

    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
        password: hash,
        document,
      },
    });

    ctx.status = 201;

    ctx.body = remove('password', company);
  },
};

export default companies;
