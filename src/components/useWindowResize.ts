import { useEffect } from 'react';
import { VoidFunction } from '../CustomTypes';

/**
 * useWindowResize attaches a function to resize window event handler
 * and optionally can be run on initial render
 *
 * @param resizeFunction Function to run when window resize event listener is called
 * @param runInitial If present, the callback function will run on initial render
 *
 */
export const useWindowResize = (resizeFunction: VoidFunction, runInitial = false): void => {
  useEffect((): VoidFunction => {
    if (runInitial) resizeFunction();
    window.addEventListener('resize', resizeFunction);
    return (): void => { window.removeEventListener('resize', resizeFunction); };
  });
};
