"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.patch = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var EnumMethods_1 = require("./EnumMethods");
var EnumMetadataKeys_1 = require("./EnumMetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(EnumMetadataKeys_1.EnumMetadataKeys.path, path, target, key);
            Reflect.defineMetadata(EnumMetadataKeys_1.EnumMetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(EnumMethods_1.EnumMethods.get);
exports.post = routeBinder(EnumMethods_1.EnumMethods.post);
exports.put = routeBinder(EnumMethods_1.EnumMethods.put);
exports.patch = routeBinder(EnumMethods_1.EnumMethods.patch);
exports.del = routeBinder(EnumMethods_1.EnumMethods.del);
