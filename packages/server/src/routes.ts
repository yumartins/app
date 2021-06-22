import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { companies } from './controllers';
import { vCompanies } from './validators';

const router = new Router<DefaultState, Context>({ prefix: '/api' });

/**
 * Companies.
 */
router
  .get('/companies', companies.list)
  .post('/companies', vCompanies, companies.create);

export default router;
