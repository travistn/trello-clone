import { RefObject, useEffect } from 'react';

import useEscapeClose from './useEscapeClose';

const useClickoutClose = (
  ref: RefObject<HTMLFormElement>,
  setToggle: ((toggle: boolean) => void) | undefined
) => {
  useEscapeClose(setToggle);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) {
        setToggle?.(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
};

export default useClickoutClose;
