import 'reflect-metadata';
import { EnumMetadataKeys } from './EnumMetadataKeys';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(EnumMetadataKeys.validator, keys, target);
  };
}
