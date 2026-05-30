import { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import { useSearchParams } from 'react-router';

import { ErrorComponent } from './ErrorComponent';
import { useLocalStorage } from './hooks/useLocalStorage';

export const Search: FC = () => {
  const [crash, setCrash] = useState<boolean>(false);
  const [value, setValue] = useLocalStorage('userValue');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    localStorage.setItem('userValue', value.toLowerCase().trim());
    setSearchParams({
      ...Object.fromEntries(searchParams),
      name: value.toLowerCase().trim(),
    });
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
    <div className="flex justify-center items-center flex-col sm:flex-row  max-w-[1240px] mx-auto w-full p-4 gap-6 border rounded-sm border-gray-300">
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
