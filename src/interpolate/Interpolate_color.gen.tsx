/* TypeScript file generated by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const Interpolate_colorBS = require('./Interpolate_color.bs');

// tslint:disable-next-line:interface-over-type-literal
export type rgba<a> = {
  readonly r: a; 
  readonly g: a; 
  readonly b: a; 
  readonly a: a
};

export const lerpColorRGBA: (_1:{
  readonly acc: rgba<number>; 
  readonly target: rgba<number>; 
  readonly roundness: number
}) => rgba<number> = function (Arg1: any) {
  const result = Curry._3(Interpolate_colorBS.lerpColorRGBA, Arg1.acc, Arg1.target, Arg1.roundness);
  return result
};

export const remapColor: (_1:{
  readonly range: [number, number]; 
  readonly domain: [rgba<number>, rgba<number>]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_colorBS.remapColor, Arg1.range, Arg1.domain, Arg1.value);
  return result
};
