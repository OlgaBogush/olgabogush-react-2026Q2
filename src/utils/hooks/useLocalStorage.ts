import { useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const localItem: string = localStorage.getItem(key) || '';
      return localItem;
    }
    return '';
  });

  return [value, setValue] as const;
};
