import { useEffect, useCallback } from 'react';

const useEscapeClose = (setToggle: ((toggle: boolean) => void) | undefined) => {
  const handleEscKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setToggle?.(false);
      }
    },
    [setToggle]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey);

    return () => {
      document.removeEventListener('keyup', handleEscKey);
    };
  }, [handleEscKey]);
};

export default useEscapeClose;
