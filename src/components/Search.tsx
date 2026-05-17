import { FC, useState } from 'react';
import ErrorComponent from './ErrorComponent';

interface SearchProps {
  showCards: (str: string) => void;
}

interface SearchState {
  value: string;
  cleanValue: string;
  shouldCrash: boolean;
}

const Search: FC<SearchProps> = ({ showCards }) => {
  const [state, setState] = useState<SearchState>(() => {
    const valueFromLocalStorage: string | null =
      localStorage.getItem('userValue');
    return valueFromLocalStorage
      ? {
          value: valueFromLocalStorage,
          cleanValue: valueFromLocalStorage,
          shouldCrash: false,
        }
      : { value: '', cleanValue: '', shouldCrash: false };
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      value: e.target.value,
      cleanValue: e.target.value.toLowerCase().trim(),
    }));
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      showCards(state.cleanValue);
      localStorage.setItem('userValue', state.cleanValue);
    }
  };

  return (
    <div className="flex items-center flex-col sm:flex-row gap-4 p-4 border rounded-sm border-gray-300 border-solid">
      {state.shouldCrash && <ErrorComponent />}
      <input
        className="p-1 w-56 border rounded-sm border-gray-300 border-solid"
        type="text"
        name="name"
        value={state.value}
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        placeholder="Search Pokémon"
        autoComplete="off"
      />

      <button
        className="p-1 w-56 sm:w-30 cursor-pointer rounded-sm bg-green-200"
        onClick={() => {
          showCards(state.cleanValue);
          localStorage.setItem('userValue', state.cleanValue);
        }}
      >
        Search
      </button>

      <button
        className="p-1 w-56 sm:w-30 cursor-pointer rounded-sm bg-red-200"
        onClick={() => setState((prev) => ({ ...prev, shouldCrash: true }))}
      >
        Test
      </button>
    </div>
  );
};

export default Search;
