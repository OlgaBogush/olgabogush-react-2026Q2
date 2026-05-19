import { FC } from 'react';
import { useSearchParams } from 'react-router';

import CardsList from '../components/CardsList';
import { DataItem } from '../components/CardsList';
import Loader from '../components/loader/Loader';
import Pagination from '../components/Pagination';
import SingleCard from '../components/SingleCard';

export interface MainProps {
  data: DataItem[];
  isLoading: boolean;
}

const Main: FC<MainProps> = ({ data, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage: number = Number(searchParams.get('page')) || 1;
  const currentId: string | null = searchParams.get('id');

  const handlePageChange = (newPage: number) => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams.id;
    setSearchParams({
      ...currentParams,
      page: String(newPage),
    });
  };

  const handleSelectCard = (id: number) => {
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({
      ...currentParams,
      id: String(id),
    });
  };

  const handleCloseCard = () => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams.id;
    setSearchParams(currentParams);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <CardsList data={data} onCardClick={handleSelectCard} />
        {currentId && (
          <SingleCard id={currentId} handleCloseCard={handleCloseCard} />
        )}
      </div>
      <Pagination page={currentPage} setPage={handlePageChange} />
    </div>
  );
};

export default Main;
