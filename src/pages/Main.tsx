import { FC, useCallback, useEffect, useRef, useState } from 'react';
import CardsList from '../components/CardsList';
import Search from '../components/Search';
import Loader from '../components/loader/Loader';

export interface DataItem {
  name: string;
  url: string;
}

interface MainState {
  data: DataItem[];
  isLoading: boolean;
  lastQuery: string | undefined;
  errorMessage: string | undefined;
}

const defaultState: MainState = {
  data: [],
  isLoading: true,
  lastQuery: undefined,
  errorMessage: '',
};

const Main: FC = () => {
  const [state, setState] = useState(defaultState);

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCards = useCallback(
    async (str: string) => {
      if (str === state.lastQuery) {
        return;
      }
      setState((prev) => ({
        ...prev,
        isLoading: true,
        lastQuery: str,
        errorMessage: '',
      }));

      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${str ? str : ''}`
        );

        if (res.status >= 400 && res.status < 500) {
          setState((prev) => ({
            ...prev,
            errorMessage:
              'A card with that name was not found. Please check the entered data and try again.',
          }));
          throw new Error(
            'Something went wrong. Check the entered data and try again.'
          );
        } else if (res.status >= 500) {
          setState((prev) => ({
            ...prev,
            errorMessage: 'The server has failed, please, try again later.',
          }));
          throw new Error('The server has failed, please, try again later.');
        }

        const data = await res.json();

        if (data?.results) {
          setState((prev) => ({ ...prev, data: data.results }));
        } else {
          setState((prev) => ({
            ...prev,
            data: [{ name: data.name, url: data.species.url }],
          }));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [state.lastQuery]
  );

  useEffect(() => {
    const userValue: string | null = localStorage.getItem('userValue');
    if (userValue) {
      timerId.current = setTimeout(() => {
        showCards(userValue.toLowerCase().trim());
      }, 1000);
    } else {
      timerId.current = setTimeout(() => {
        showCards('');
      }, 1000);
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [showCards]);

  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center">
      <Search showCards={showCards} />
      {state.isLoading ? (
        <Loader />
      ) : state.errorMessage ? (
        <div>{state.errorMessage}</div>
      ) : (
        <CardsList data={state.data} />
      )}
    </div>
  );
};

export default Main;
