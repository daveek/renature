import React from 'react';

import { CSSPairs, getInterpolatorsForPairs } from '../helpers/pairs';
import {
  FluidResistance1DParams,
  fluidResistance1D,
  Controller,
} from '../animation';
import { getFluidPositionAtTerminalVelocity } from '../forces';

type UseFluidResistanceArgs = CSSPairs &
  Omit<FluidResistance1DParams, 'onComplete' | 'onUpdate'>;

export const useFluidResistance = <M extends HTMLElement = any>({
  from,
  to,
  config,
  immediate = true,
  delay,
  infinite,
}: UseFluidResistanceArgs): [
  { ref: React.MutableRefObject<M | null> },
  Controller
] => {
  /**
   * Store a ref to the DOM element we'll be animating.
   * A user will spread this ref onto their own element, which
   * is what allows us to directly update the style property
   * without triggering rerenders.
   */
  const ref = React.useRef<M | null>(null);

  const { controller } = React.useMemo(() => {
    const interpolators = getInterpolatorsForPairs({ from, to });

    return fluidResistance1D({
      config,
      onUpdate: ({ position }) => {
        interpolators.forEach(({ interpolator, property, values }) => {
          const value = interpolator({
            range: [0, getFluidPositionAtTerminalVelocity(config)],
            domain: [values.from, values.to],
            value: position[1],
          });

          if (ref.current) {
            ref.current.style[property as any] = `${value}`;
          }
        });
      },
      onComplete: () => {
        /**
         * Ensure our animation has reached the to value when the physics stopping
         * condition has been reached.
         */
        interpolators.forEach(({ property, values }) => {
          if (ref.current && ref.current.style[property as any] !== values.to) {
            ref.current.style[property as any] = values.to;
          }
        });
      },
      infinite,
    });
  }, [from, to, config, infinite]);

  /**
   * Store a ref to the controller. This will allow a user to
   * start and stop animations at will.
   */
  const controllerRef = React.useRef<Controller>({
    start: controller.start,
    stop: () => {},
  });

  React.useLayoutEffect(() => {
    const ctrl = controllerRef;

    if (immediate && !delay) {
      const { stop } = controller.start();
      ctrl.current.stop = stop;
    }

    let timerId: NodeJS.Timeout;
    if (immediate && delay) {
      timerId = setTimeout(() => {
        const { stop } = controller.start();
        ctrl.current.stop = stop;
      }, delay);
    }

    return () => {
      timerId && clearTimeout(timerId);

      // Ensure we cancel any running animation on unmount.
      ctrl.current.stop();
    };
  }, [immediate, delay, controller]);

  return [{ ref }, controllerRef.current];
};
