import { useSearchParams } from 'next/navigation';

export const useGetCurrentPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;
  return currentPage;
};
