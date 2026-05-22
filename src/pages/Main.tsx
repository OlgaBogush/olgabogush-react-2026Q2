import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

import CardsList from '../components/CardsList';
import { DataItem } from '../components/CardsList';
import Loader from '../components/loader/Loader';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import showCards from '../api/showCards';

interface ICharacter {
  id: number;
  name: string;
  image: string;
}

interface MainState {
  data: DataItem[];
  character: ICharacter | null;
  lastQuery: string | undefined;
}

const defaultState: MainState = {
  data: [],
  character: null,
  lastQuery: undefined,
};

const Main: FC = () => {
  const [state, setState] = useState(defaultState);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentUserValue =
    searchParams.get('name') || localStorage.getItem('userValue') || '';

  useEffect(() => {
    const savedValue = localStorage.getItem('userValue');
    const hasName = searchParams.has('name');
    const hasPage = searchParams.has('page');

    if (savedValue && !hasName && !hasPage) {
      navigate(`/?page=${currentPage}&name=${encodeURIComponent(savedValue)}`, {
        replace: true,
      });
    }
  }, [searchParams, navigate, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characters: DataItem[] = await showCards(currentPage);

        if (!characters || characters.length === 0) {
          throw new Error('No characters found.');
        }

        setState((prev) => ({ ...prev, data: characters }));
      } catch (err) {
        console.log(err);
        setErrorState('404 Not Found');
      } finally {
        setIsLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [currentPage, currentUserValue]);

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    setState((prev) => ({ ...prev, data: [] }));
    setErrorState(null);
    if (currentUserValue) {
      navigate(
        `/?page=${newPage}&name=${encodeURIComponent(currentUserValue)}`
      );
    } else navigate(`/?page=${newPage}`);
  };

  useEffect(() => {
    if (errorState) {
      navigate('/error');
    }
  }, [errorState, navigate]);

  const filteredData = state.data.filter((item) =>
    item.name.toLowerCase().includes(currentUserValue.toLowerCase())
  );

  return (
    <>
      <Search />
      <div className="flex flex-col gap-4 w-full max-w-[1240px] mx-auto">
        <div className=" w-full p-6 flex justify-center items-center gap-6 border rounded-sm border-gray-300">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CardsList data={filteredData} />
              <Outlet />
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Main;
