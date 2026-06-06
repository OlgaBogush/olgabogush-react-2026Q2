import { useSearchParams } from 'react-router';

export const useGetCurrentPage = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  return currentPage;
};
