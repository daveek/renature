/* TypeScript file generated by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const Interpolate_transformBS = require('./Interpolate_transform.bs');

// tslint:disable-next-line:interface-over-type-literal
export type cssTransform = { readonly transform: string; readonly transformProperty: (null | undefined | string) };

export const parseTransformSingle: (_1:string) => cssTransform[] = Interpolate_transformBS.parseTransformSingle;

export const remapTransformSingle: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_transformBS.remapTransformSingle, Arg1.range, Arg1.domain, Arg1.value);
  return result
};

export const splitTransform: (_1:{ readonly transform: string; readonly matches?: Array<(null | undefined | string)> }, _2:void) => string[] = function (Arg1: any, Arg2: any) {
  const result = Curry._3(Interpolate_transformBS.splitTransform, Arg1.transform, Arg1.matches, Arg2);
  return result
};

export const remapTransform: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_transformBS.remapTransform, Arg1.range, Arg1.domain, Arg1.value);
  return result
};
