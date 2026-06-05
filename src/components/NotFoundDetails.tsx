import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export interface NotFoundDetailsProps {
  errorMessageForDetails: string;
}

export const NotFoundDetails: FC<NotFoundDetailsProps> = ({
  errorMessageForDetails,
}) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();

  const closeNotFoundDetails = () => {
    navigate(`/?page=${currentPage}`);
  };

  return (
    <div className="relative flex grow flex-col items-center justify-center self-start p-8 gap-2 border rounded-sm border-gray-300 border-solid">
      <button
        type="button"
        onClick={closeNotFoundDetails}
        className="absolute top-0 right-2 text-gray-300 hover:text-gray-500 font-bold text-lg cursor-pointer"
      >
        x
      </button>
      <p className="flex items-center justify-center text-center">
        {errorMessageForDetails}
      </p>
    </div>
  );
};
