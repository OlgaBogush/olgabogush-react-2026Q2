'use client';

import { FC, useEffect } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { DataItem } from '../components/CardsList';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { useGetCardsQuery } from '../features/api/apiSlice';
import { useGetCurrentPage } from '../utils/hooks/useGetCurrentPage';
import { getErrorMessage } from '../utils/getErrorMessage';
import { renderContent } from '../utils/renderContent';

export const Main: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = useGetCurrentPage();
  const activeId = searchParams?.get('id') || undefined;

  const { data, isLoading, isFetching, error, refetch } =
    useGetCardsQuery(currentPage);

  const currentUserValue =
    searchParams?.get('name') ||
    (typeof window !== 'undefined' ? localStorage.getItem('userValue') : '') ||
    '';

  const hasName = searchParams?.has('name');
  const hasPage = searchParams?.has('page');

  useEffect(() => {
    const savedValue = localStorage.getItem('userValue');

    if (savedValue && !hasName && !hasPage) {
      router.replace(
        `${pathname}?page=${currentPage}&name=${encodeURIComponent(savedValue)}`
      );
    }
  }, [router, currentPage, pathname, hasName, hasPage]);

  const handlePageChange = (newPage: number) => {
    if (currentUserValue) {
      router.replace(
        `${pathname}?page=${newPage}&name=${encodeURIComponent(currentUserValue)}`
      );
    } else router.replace(`${pathname}?page=${newPage}`);
  };

  const filteredData: DataItem[] =
    data?.results.filter((item) =>
      item.name.toLowerCase().includes(currentUserValue.toLowerCase())
    ) || [];

  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage(error);
      router.replace(`/error?msg=${encodeURIComponent(errorMessage)}`);
    }
  }, [error, router]);

  return (
    <>
      <Search />
      <div className="flex flex-col gap-4 w-full max-w-[1240px] mx-auto">
        <div className="w-full p-6 flex justify-center items-center gap-6 border rounded-sm border-gray-300">
          {renderContent({
            data,
            filteredData,
            isLoading,
            isFetching,
            activeId,
          })}
        </div>
        <div className="flex items-center justify-between">
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          <button
            className="min-w-40 h-8 text-base cursor-pointer border rounded-sm border-red-700"
            onClick={refetch}
          >
            Refetch Cards
          </button>
        </div>
      </div>
    </>
  );
};
