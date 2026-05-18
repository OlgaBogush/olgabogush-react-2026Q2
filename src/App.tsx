import { FC, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router';

import { DataItem } from './components/CardsList';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Search from './components/Search';
import showCards from './api/showCards';
import NotFoundPage from './pages/NotFoundPage';

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    searchParams.set('page', '1');
    searchParams.delete('id');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const characters: DataItem[] = await showCards(currentPage);
        if (!characters || characters.length === 0) {
          navigate('/error');
          return;
        }
        setState((prev) => ({ ...prev, data: characters }));
      } catch (err) {
        console.error(err);

        const errorMessage =
          err instanceof Error
            ? err.message
            : 'An unexpected error has occurred. Please try again later.';

        navigate('/error', { state: { message: errorMessage } });
      } finally {
        setIsLoading(false);
      }
    };
    const timerId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [currentPage, navigate]);

  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center">
      <Header />
      <Search />
      <Routes>
        <Route
          path="/"
          element={<Main data={state.data} isLoading={isLoading} />}
        />
        <Route path="/error" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
