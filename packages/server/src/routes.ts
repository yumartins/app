import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { auth, users, companies } from './controllers';
import { vCompanies } from './validators';

const router = new Router<DefaultState, Context>({ prefix: '/api' });

router
  .post('/auth', auth)

  /**
   * Companies.
   */
  .get('/companies', companies.list)
  .post('/companies', vCompanies, companies.create)
  .get('/companies/:id/users', users.list)
  .post('/companies/:id/users', users.create);

export default router;
