import { useEffect, useState } from 'react';

export default function useLocaleStorage(
  key: string,
  defaultValue: string | (() => string)
) {
  const [name, setName] = useState<string>(() => {
    const currentName = localStorage.getItem(key);
    if (currentName !== null) return currentName;

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, name);
  }, [key, name]);

  return [name, setName] as const;
}
