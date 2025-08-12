import { useEffect, useState } from "react";

export const useDebounce = (searchString) => {
  const [debounce, setDebounce] = useState(``);

  useEffect(() => {
    const debounceValue = setTimeout(() => {
      setDebounce(searchString.trim());
    }, 1000);
    return () => clearTimeout(debounceValue);
  }, [searchString]);

  return debounce;
};
