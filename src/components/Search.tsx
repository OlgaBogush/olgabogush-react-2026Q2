import { FC, useState } from 'react';

import ErrorComponent from './ErrorComponent';

const Search: FC = () => {
  const [crash, setCrash] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('pol');
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center flex-col sm:flex-row  max-w-[1240px] mx-auto w-full p-4 gap-6 border rounded-sm border-gray-300">
      {crash && <ErrorComponent />}
      <input
        className="w-full h-8 text-base px-2 border rounded-sm border-gray-300"
        type="text"
        name="name"
        value={value}
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        placeholder="Search character"
        autoComplete="off"
      />

      <button
        className="min-w-20 h-8 text-base cursor-pointer rounded-sm bg-green-200"
        onClick={handleSearchSubmit}
      >
        Search
      </button>

      <button
        className="min-w-20 h-8 text-base cursor-pointer rounded-sm bg-red-200"
        onClick={() => setCrash(true)}
      >
        Test
      </button>
    </div>
  );
};

export default Search;
