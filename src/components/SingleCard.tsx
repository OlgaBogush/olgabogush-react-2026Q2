import { FC } from 'react';

import { useNavigate, useParams } from 'react-router';
import { useGetSingleCardQuery } from '../features/api/apiSlice';
import { Loader } from './loader/Loader';
import { NotFoundDetails } from './NotFoundDetails';
import { useGetCurrentPage } from '../utils/hooks/useGetCurrentPage';
import { getErrorMessage } from '../utils/getErrorMessage';

export interface ICharacterState {
  name: string;
  status: string;
  gender: string;
  image: string | undefined;
  created: string;
}

export const SingleCard: FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const {
    data: card,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetSingleCardQuery(id || '');

  const currentPage = useGetCurrentPage();
  const navigate = useNavigate();

  const closeSingleCard = () => {
    navigate(`/?page=${currentPage}`);
  };

  if (error || !card) {
    let errorMessageForDetails = `Couldn't upload detailed information. Please try again.`;
    if (error) {
      errorMessageForDetails = getErrorMessage(error);
    }
    return <NotFoundDetails errorMessageForDetails={errorMessageForDetails} />;
  }

  if (isLoading || isFetching) return <Loader />;

  return (
    <div className="relative flex grow flex-col self-start w-64 p-4 gap-2 border rounded-sm border-gray-300 border-solid">
      <div className="flex items-center justify-center p-8">
        <button
          onClick={closeSingleCard}
          className="absolute top-0 right-2 text-gray-300 hover:text-gray-500 font-bold text-lg cursor-pointer"
        >
          x
        </button>
        <img className="rounded-sm" src={card.image} alt={card.name} />
      </div>
      <div className="flex flex-col">
        <h3 className="capitalize">{card.name}</h3>
        <p className="text-sm text-gray-500 italic">
          <span>status: </span>
          {card.status}
        </p>
        <p className="text-sm text-gray-500 italic">
          <span>gender: </span>
          {card.gender}
        </p>
        <p className="text-xs text-gray-700 italic">{card.created}</p>
      </div>
      <button
        className="min-w-40 h-8 text-base cursor-pointer border rounded-sm border-red-700"
        onClick={refetch}
      >
        Refetch Details
      </button>
    </div>
  );
};
