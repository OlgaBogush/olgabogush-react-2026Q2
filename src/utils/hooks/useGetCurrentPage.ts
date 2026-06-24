import { useSearchParams } from 'react-router';

export const useGetCurrentPage = () => {
  const [searchParams] = useSearchParams();
  return Number(searchParams.get('page')) || 1;
};
