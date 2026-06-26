import { useSearchParams } from 'next/navigation';

export const useGetCurrentPage = () => {
  const searchParams = useSearchParams();
  return Number(searchParams?.get('page')) || 1;
};
