'use client';

import { useEffect } from 'react';

import { useSearchParams, notFound } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';

import { DataItem } from '../components/CardsList';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { useGetCardsQuery } from '../features/api/apiSlice';
import { renderContent } from '../utils/renderContent';
import { getCurrentPage } from '../utils/getCurrentPage';

interface MainProps {
  serverData: { results: DataItem[] } | null;
  currentPage: number;
  currentName: string;
}

export default function Main({
  serverData,
  currentPage,
  currentName,
}: MainProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const urlPage = Number(searchParams?.get('page'));
  const page = getCurrentPage(urlPage) === 1 ? currentPage || 1 : urlPage;

  const activeIdFromUrl = searchParams?.get('id') || undefined;

  const { data, isLoading, isFetching, error, refetch } =
    useGetCardsQuery(page);

  const clientData = data || serverData;

  const currentUserValue =
    searchParams?.get('name') ||
    currentName ||
    (typeof window !== 'undefined' ? localStorage.getItem('userValue') : '') ||
    '';

  const hasName = searchParams?.has('name');
  const hasPage = searchParams?.has('page');

  useEffect(() => {
    const savedValue = localStorage.getItem('userValue');

    if (savedValue && !hasName && !hasPage) {
      router.replace(
        `${pathname}?page=${page}&name=${encodeURIComponent(savedValue)}`
      );
    }
  }, [router, page, pathname, hasName, hasPage]);

  const handlePageChange = (newPage: number) => {
    const targetPage = getCurrentPage(newPage);
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.set('page', String(targetPage));

    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  const filteredData: DataItem[] =
    clientData?.results.filter((item) =>
      item.name.toLowerCase().includes(currentUserValue.toLowerCase())
    ) || [];

  useEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  return (
    <>
      <Search />
      <main className="flex flex-col gap-4 w-full max-w-[1240px] mx-auto">
        <div className="w-full p-6 flex justify-center items-center gap-6 border rounded-sm border-gray-300">
          {renderContent({
            data: clientData,
            filteredData,
            isLoading: data ? false : isLoading,
            isFetching,
            activeId: activeIdFromUrl,
          })}
        </div>
        <div className="flex items-center justify-between">
          <Pagination currentPage={page} handlePageChange={handlePageChange} />
          <button
            className="min-w-40 h-8 text-base cursor-pointer border rounded-sm border-red-700"
            onClick={refetch}
          >
            Refetch Cards
          </button>
        </div>
      </main>
    </>
  );
}
