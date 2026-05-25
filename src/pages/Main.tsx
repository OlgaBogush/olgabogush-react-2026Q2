import { FC, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

import { CardsList } from '../components/CardsList';
import { Loader } from '../components/loader/Loader';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCards, resetCardsState } from '../features/cards/cardsSlice';

export const Main: FC = () => {
  const { cards, errorState, isLoading } = useAppSelector(
    (state) => state.cards
  );
  const dispatch = useAppDispatch();
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
    const timerId = setTimeout(() => {
      dispatch(getCards(currentPage));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(resetCardsState());
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

  const filteredData = cards.filter((item) =>
    item.name.toLowerCase().includes(currentUserValue.toLowerCase())
  );

  let content;

  if (isLoading) {
    content = <Loader />;
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
        <div className=" w-full p-6 flex justify-center items-center gap-6 border rounded-sm border-gray-300">
          {content}
        </div>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};
