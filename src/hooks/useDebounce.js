import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  console.log(`[useDebounce] Initial value: ${value}, debouncedValue: ${debouncedValue}`);

  useEffect(() => {
    console.log(`[useDebounce] useEffect triggered for value: ${value}`);
    const handler = setTimeout(() => {
      console.log(`[useDebounce] Setting debouncedValue to: ${value} after ${delay}ms`);
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log(`[useDebounce] Clearing timeout for value: ${value}`);
      clearTimeout(handler);
    };
  }, [value, delay]);

  console.log(`[useDebounce] Returning debouncedValue: ${debouncedValue}`);
  return debouncedValue;
}

export default useDebounce;
