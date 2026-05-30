import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { resetCardsState } from '../features/cards/cardsSlice';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoHome = () => {
    dispatch(resetCardsState());
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full max-w-[1240px] mx-auto p-6 items-center gap-6 border rounded-sm border-gray-300">
      <p>404 (Not Found)</p>
      <p>Something went wrong. No data was found, please, try again later.</p>
      <button
        className="min-w-40 h-8 text-base border rounded-sm border-gray-300 cursor-pointer"
        onClick={handleGoHome}
      >
        Go to the main page
      </button>
    </div>
  );
};
