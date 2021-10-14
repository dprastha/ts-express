import 'reflect-metadata';
import { RequestHandler } from 'express';
import { EnumMetadataKeys } from './EnumMetadataKeys';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(EnumMetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(EnumMetadataKeys.middleware, [...middlewares, middleware], target, key);
  };
}
