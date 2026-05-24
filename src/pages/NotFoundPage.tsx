import { FC } from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full max-w-[1240px] mx-auto p-6 items-center gap-6 border rounded-sm border-gray-300">
      <p>404 (Not Found)</p>
      <p>Something went wrong. No data was found, please, try again later.</p>
      <button
        className="min-w-40 h-8 text-base border rounded-sm border-gray-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Go to the main page
      </button>
    </div>
  );
};

export default NotFoundPage;
