'use client';
import { Suspense } from 'react';
import Main from '../../pages/Main';

export default function DetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  );
}
