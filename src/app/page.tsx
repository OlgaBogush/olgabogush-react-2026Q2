import { Suspense } from 'react';

import Main from '../pages/Main';
import { BASE_URL } from '@/utils/constants';
import { getCurrentPage } from '../utils/getCurrentPage';

interface PageProps {
  searchParams: Promise<{ page?: string; name?: string; id?: string }>;
}

async function getCards(page: string, name: string) {
  try {
    const url = `${BASE_URL}?page=${page}&name=${encodeURIComponent(name)}`;

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Server fetch error:', error);
    return null;
  }
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams.page);
  const currentPage = getCurrentPage(page);

  const currentName = resolvedParams.name || '';

  const serverData = await getCards(String(currentPage), currentName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main
        serverData={serverData}
        currentPage={Number(currentPage)}
        currentName={currentName}
      />
    </Suspense>
  );
}
