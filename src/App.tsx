import { FC } from 'react';
import { Route, Routes } from 'react-router';

import { Main } from './pages/Main';
import { Header } from './pages/Header';
import { Footer } from './pages/Footer';
import { NotFoundPage } from './pages/NotFoundPage';
import { About } from './components/About';
import { SingleCard } from './components/SingleCard';

export const App: FC = () => {
  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path=":id" element={<SingleCard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
