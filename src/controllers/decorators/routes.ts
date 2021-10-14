import 'reflect-metadata';
import { EnumMethods } from './EnumMethods';
import { EnumMetadataKeys } from './EnumMetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(EnumMetadataKeys.path, path, target, key);
      Reflect.defineMetadata(EnumMetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(EnumMethods.get);
export const post = routeBinder(EnumMethods.post);
export const put = routeBinder(EnumMethods.put);
export const patch = routeBinder(EnumMethods.patch);
export const del = routeBinder(EnumMethods.del);
