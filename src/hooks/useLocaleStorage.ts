import { useEffect, useState } from 'react';

export function useLocaleStorage(key: string) {
  const [name, setName] = useState<string>(() => {
    const currentName = localStorage.getItem(key);
    if (currentName !== null) {
      return currentName;
    } else {
      return '';
    }
  });

  useEffect(() => {
    localStorage.setItem(key, name);
  }, [key, name]);

  return [name, setName] as const;
}
