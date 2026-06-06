import { FC, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

import { CardsList, DataItem } from '../components/CardsList';
import { Loader } from '../components/loader/Loader';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { useGetCardsQuery } from '../features/api/apiSlice';
import { NotFoundPage } from './NotFoundPage';
import { useGetCurrentPage } from '../utils/hooks/useGetCurrentPage';

export const Main: FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = useGetCurrentPage();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, refetch } =
    useGetCardsQuery(currentPage);

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

  const handlePageChange = (newPage: number) => {
    if (currentUserValue) {
      navigate(
        `/?page=${newPage}&name=${encodeURIComponent(currentUserValue)}`
      );
    } else navigate(`/?page=${newPage}`);
  };

  const filteredData: DataItem[] =
    data?.results.filter((item) =>
      item.name.toLowerCase().includes(currentUserValue.toLowerCase())
    ) || [];

  let content;
  let errorMessage = 'Something went wrong. Please try again later.';

  if (error) {
    if ('status' in error) {
      if (error.status === 404) {
        errorMessage = 'Not Found. Please check the search parameters.';
      } else if (error.status === 'FETCH_ERROR') {
        errorMessage = 'Network error. Please try again later.';
      } else
        errorMessage = `Server error. Code: ${error.status}. Please try again later.`;
    } else if (error.message) {
      errorMessage = `Critical application error. ${error.message}`;
    }
  }

  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (error) {
    content = <NotFoundPage errorMessage={errorMessage} />;
  } else if (filteredData.length === 0) {
    content = (
      <NotFoundPage errorMessage="Nothing was found for your query. Please check the search parameters." />
    );
  } else {
    content = (
      <>
        <CardsList data={filteredData} />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Search />
      <div className="flex flex-col gap-4 w-full max-w-[1240px] mx-auto">
        <div className="w-full p-6 flex justify-center items-center gap-6 border rounded-sm border-gray-300">
          {content}
        </div>
        <div className="flex items-center justify-between">
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          <button
            className="min-w-40 h-8 text-base cursor-pointer border rounded-sm border-red-700"
            onClick={refetch}
          >
            Refetch Cards
          </button>
        </div>
      </div>
    </>
  );
};
