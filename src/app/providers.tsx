'use client';

import { FC, useState, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store/store';
import { ThemeContext } from '../context/ThemeContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAppSelector } from '../store/hooks';
import { selectFavouritesList } from '../features/favourites/favouritesSlice';
import { Favourites } from '../components/Favourites';
import { Header } from '../pages/Header';
import { Footer } from '../pages/Footer';

interface ProvidersProps {
  children: ReactNode;
}

const AppThemeAndLayoutWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const favourites = useAppSelector(selectFavouritesList);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <div
        className={`flex flex-col gap-6 p-6 items-center justify-center min-h-screen ${
          isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } ${favourites.length ? 'pb-48' : ''}`}
      >
        <Header />

        <main className="w-full flex flex-col items-center justify-center grow">
          {children}
        </main>

        <Footer />
        <Favourites favourites={favourites} />
      </div>
    </ThemeContext.Provider>
  );
};

export const Providers: FC<ProvidersProps> = ({ children }) => {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppThemeAndLayoutWrapper>{children}</AppThemeAndLayoutWrapper>
      </ErrorBoundary>
    </Provider>
  );
};
