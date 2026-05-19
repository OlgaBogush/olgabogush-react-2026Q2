import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

const NotFoundPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const errorMessage = location.state?.message || 'Something went wrong.';

  return (
    <div className="flex flex-col w-full max-w-[1240px] mx-auto p-6 items-center gap-6 border rounded-sm border-gray-300">
      <p>{errorMessage}</p>
      <button
        className="py-1 px-2 border rounded-sm border-gray-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Go to the main page
      </button>
    </div>
  );
};

export default NotFoundPage;
