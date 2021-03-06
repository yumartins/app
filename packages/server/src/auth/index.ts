import JWT from 'jsonwebtoken';
import { Context } from 'koa';

import Forbidden from './forbidden';
import { Payload } from './types';
import Unauthorized from './unauthorized';

/**
 * JWT secret.
 */
const secret = process.env.APP_SECRET || '';

/**
 * Resolve token from header.
 */
export const getToken = (ctx: Context): string => {
  if (! ctx.headers || ! ctx.headers.authorization) {
    throw new Unauthorized();
  }

  const splitted = ctx.headers.authorization.split(' ');

  if (splitted.length !== 2
      || splitted[0] !== 'Bearer'
      || ! splitted[1]
  ) throw new Unauthorized('Bad Authorization header format. Format is "Authorization: Bearer <token>"');

  return splitted[1];
};

/**
 * Verify JWT token.
 */
export const verifyToken = (token: string, secrets: string): any => {
  try {
    return JWT.verify(token, secrets);
  } catch (e) {
    //
  }

  throw new Unauthorized();
};

/**
 * Generate JWT token.
 */
export const generate = (payload: Payload): string => {
  const {
    id,
    type,
  } = payload;

  return JWT.sign({ id, type }, secret, {
    expiresIn: '7d',
  });
};

export {
  Forbidden,
  Unauthorized,
};
