'use client';

import { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { ErrorComponent } from './ErrorComponent';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';

export const Search: FC = () => {
  const [crash, setCrash] = useState<boolean>(false);
  const [value, setValue] = useLocalStorage('userValue');

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    const currentValue = value.toLowerCase().trim();
    localStorage.setItem('userValue', currentValue);

    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set('name', currentValue);
    currentParams.set('page', '1');

    router.replace(`${pathname}?${currentParams.toString()}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleTestClick = () => {
    setCrash(true);
  };

  return (
    <div className="flex justify-center items-center flex-col sm:flex-row mb-4 max-w-[1240px] mx-auto w-full p-4 gap-6 border rounded-sm border-gray-300">
      {crash && <ErrorComponent />}
      <input
        className="w-full h-8 text-base px-2 border rounded-sm border-gray-300"
        type="text"
        name="name"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search character"
        autoComplete="off"
      />

      <button
        className="min-w-20 h-8 text-base cursor-pointer border rounded-sm border-green-700"
        onClick={handleSearchSubmit}
      >
        Search
      </button>

      <button
        className="min-w-20 h-8 text-base cursor-pointer border rounded-sm border-red-700"
        onClick={handleTestClick}
      >
        Test
      </button>
    </div>
  );
};
