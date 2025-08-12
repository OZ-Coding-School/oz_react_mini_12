import { useEffect, useRef } from "react";

export const useThrottle = (callback, delay = 1000) => {
  const throttle = (func, delay) => {
    // throttle => 일정시간간격동안 함수(func)를 1번만 실행.
    let lastCall = 0; // 마지막 실행시간
    return (...args) => {
      // ...args -> 가변인자
      const now = new Date().getTime(); // 현제시간
      if (now - lastCall >= delay) {
        lastCall = now; // 마지막 실행시간을 현제시간으로 갱신
        return func(...args); // 실행할 함수
      }
    };
  };

  const throttledFn = useRef(null);

  useEffect(() => {
    throttledFn.current = throttle(callback, delay);
  }, [callback, delay]);

  return (page) => {
    throttledFn.current(page);
  };
};
