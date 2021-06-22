import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { auth, companies } from './controllers';
import { vCompanies } from './validators';

const router = new Router<DefaultState, Context>({ prefix: '/api' });

router
  .post('/auth', auth)

  /**
   * Companies.
   */
  .get('/companies', companies.list)
  .post('/companies', vCompanies, companies.create);

export default router;
