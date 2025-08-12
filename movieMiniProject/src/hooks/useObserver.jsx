import { useEffect } from "react";

export const useObserver = (observerRef, callback) => {
  useEffect(() => {
    if (!observerRef?.current) return;

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        callback();
      }
    });

    const current = observerRef.current;
    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [observerRef, callback]);
};
