import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { DataItem } from './components/CardsList';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Search from './components/Search';

interface ICharacter {
  id: number;
  name: string;
  image: string;
}

interface MainState {
  data: DataItem[];
  character: ICharacter | null;
  isLoading: boolean;
  lastQuery: string | undefined;
  errorMessage: string | undefined;
}

const defaultState: MainState = {
  data: [],
  character: null,
  isLoading: true,
  lastQuery: undefined,
  errorMessage: '',
};

const App: FC = () => {
  const [state, setState] = useState(defaultState);

  const showCards = async () => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character`);

      if (res.status >= 400 && res.status < 500) {
        throw new Error(
          'Something went wrong. No data was found, please, try again later.'
        );
      } else if (res.status >= 500) {
        throw new Error('The server has failed, please, try again later.');
      }

      const data = await res.json();

      if (data?.results) {
        return data.results;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characters: DataItem[] = await showCards();
        setState((prev) => ({ ...prev, data: characters }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center">
      <Header />
      <Search />
      <Routes>
        <Route index element={<Main data={state.data} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
