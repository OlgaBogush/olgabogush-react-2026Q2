import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

const NotFoundPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const errorMessage = location.state?.message || 'Something went wrong.';

  return (
    <div className="flex flex-col">
      <p>{errorMessage}</p>
      <button onClick={() => navigate('/')}>To the main page</button>
    </div>
  );
};

export default NotFoundPage;
