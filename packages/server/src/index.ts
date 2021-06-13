import cors from '@koa/cors';
import Koa from 'koa';
import parser from 'koa-bodyparser';
import helmet from 'koa-helmet';

// import { errors } from './middlewares';
// import { prisma } from './prisma';
// import router from './routes';

const app = new Koa();

const main = async () => {
  app
    .use(cors())
    .use(helmet())
    // .use(errors)
    .use(parser({ jsonLimit: '2mb' }));
  // .use(router.routes())
  // .use(router.allowedMethods());

  app.listen(process.env.PORT || 3333);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });

export default app;
