import { FC, useState } from 'react';

import ErrorComponent from './ErrorComponent';

import useLocaleStorage from '../hooks/useLocaleStorage';

const Search: FC = () => {
  const [value, setValue] = useLocaleStorage('userValue', '');
  const [crash, setCrash] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    setValue(value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex items-center flex-col sm:flex-row gap-4 p-4 border rounded-sm border-gray-300 border-solid">
      {crash && <ErrorComponent />}
      <input
        className="p-1 w-56 border rounded-sm border-gray-300 border-solid"
        type="text"
        name="name"
        value={value}
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        placeholder="Search character"
        autoComplete="off"
      />

      <button
        className="p-1 w-56 sm:w-30 cursor-pointer rounded-sm bg-green-200"
        onClick={handleSearchSubmit}
      >
        Search
      </button>

      <button
        className="p-1 w-56 sm:w-30 cursor-pointer rounded-sm bg-red-200"
        onClick={() => setCrash(true)}
      >
        Test
      </button>
    </div>
  );
};

export default Search;
