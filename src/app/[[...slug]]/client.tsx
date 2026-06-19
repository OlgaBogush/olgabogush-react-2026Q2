'use client';

import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ErrorBoundary } from '../../components/ErrorBoundary';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
}
