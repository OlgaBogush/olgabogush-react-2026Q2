import { useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    const localItem: string = localStorage.getItem(key) || '';
    return localItem;
  });

  return [value, setValue] as const;
};
