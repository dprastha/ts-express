import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { EnumMethods } from './EnumMethods';
import { EnumMetadataKeys } from './EnumMetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';

function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(EnumMetadataKeys.path, target.prototype, key);
      const method: EnumMethods = Reflect.getMetadata(EnumMetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(EnumMetadataKeys.middleware, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(EnumMetadataKeys.validator, target.prototype, key) || [];
      const validator = bodyValidator(requiredBodyProps);

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  };
}
