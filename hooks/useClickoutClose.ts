import { useEffect } from 'react';

const useClickoutClose = (ref: any, setToggle: any) => {
  useEffect(() => {
    let handler = (e: any) => {
      if (!ref?.current?.contains(e.target)) {
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
