import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router';
import { http, HttpResponse } from 'msw';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { apiSlice } from '../features/api/apiSlice';
import { SingleCard } from '../components/SingleCard';
import { server } from './mocks/node';
import { NotFoundDetailsProps } from '../components/NotFoundDetails';

// Мокаем дочерние компоненты для изоляции тестирования
vi.mock('../components/loader/Loader', () => ({
  Loader: () => <div>Loading Details...</div>,
}));

vi.mock('../components/NotFoundDetails', () => ({
  NotFoundDetails: ({ errorMessageForDetails }: NotFoundDetailsProps) => (
    <div>{errorMessageForDetails}</div>
  ),
}));

const createActualStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

describe('SingleCard', () => {
  let store: ReturnType<typeof createActualStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createActualStore();
    // Полностью сбрасываем кэш RTK Query между тестами, чтобы избежать артефактов
    store.dispatch(apiSlice.util.resetApiState());
  });

  const renderComponent = (initialEntries = ['/character/1']) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/character/:id" element={<SingleCard />} />
            <Route path="/" element={<div />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('render loader', async () => {
    // Даем дефолтный ответ, чтобы убрать ворнинг при монтировании
    server.use(
      http.get('*/1', () => {
        return HttpResponse.json({
          id: 1,
          name: 'Rick Sanchez',
          image: 'rick.jpeg',
        });
      })
    );

    renderComponent();
    expect(screen.getByText('Loading Details...')).toBeInTheDocument();
  });

  test('render character and action buttons', async () => {
    server.use(
      http.get('*/1', () => {
        return HttpResponse.json({
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          gender: 'Male',
          image: 'rick-1.jpeg',
          created: '2017-11-04',
        });
      })
    );

    renderComponent(['/character/1?page=3']);

    // Ждем рендеринга данных персонажа
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /rick sanchez/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();

    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();

    // Кликаем по кнопке Refetch Details
    const refetchButton = screen.getByRole('button', {
      name: /refetch details/i,
    });
    fireEvent.click(refetchButton);

    // Кликаем по кнопке закрытия карточки (крестик)
    const closeButton = screen.getByRole('button', { name: 'x' });
    fireEvent.click(closeButton);
  });

  test('render error 404', async () => {
    server.use(
      http.get('*/999', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    renderComponent(['/character/999']);

    await waitFor(() => {
      expect(
        screen.getByText('Character not found. Please try again.')
      ).toBeInTheDocument();
    });
  });

  test('render network error', async () => {
    server.use(
      http.get('*/1', () => {
        return HttpResponse.error();
      })
    );

    renderComponent(['/character/1']);

    await waitFor(() => {
      expect(
        screen.getByText('Network error. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  test('render error 500', async () => {
    server.use(
      http.get('*/1', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderComponent(['/character/1']);

    await waitFor(() => {
      expect(screen.getByText('Server error. Code: 500.')).toBeInTheDocument();
    });
  });
});
