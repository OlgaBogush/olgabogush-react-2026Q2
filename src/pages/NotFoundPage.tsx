import { FC } from 'react';
import { useNavigate } from 'react-router';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full max-w-[1240px] mx-auto p-6 items-center gap-6 border rounded-sm border-gray-300">
      <p>Not Found Page</p>
      <button
        className="min-w-40 h-8 text-base border rounded-sm border-gray-300 cursor-pointer"
        onClick={handleGoHome}
      >
        Go to the main page
      </button>
    </div>
  );
};
