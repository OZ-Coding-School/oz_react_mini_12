import { useRef, useCallback } from "react";

const useThrottle = (callback) => {
  const timeoutRef = useRef(null);
  const lastArgsRef = useRef(null);

  const throttledCallback = useCallback(
    (...args) => {
      lastArgsRef.current = args;

      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          callback(...lastArgsRef.current);
          timeoutRef.current = null;
          lastArgsRef.current = null;
        }, 300);
      }
    },
    [callback]
  );

  return throttledCallback;
};

export default useThrottle;
