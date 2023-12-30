import { useCallback, useEffect } from 'react';

export function useEscape(useRef, callbackFn) {
  const escFn = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        callbackFn(e);
      }
    },
    [callbackFn],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFn, false);
  }, [escFn]);
}
