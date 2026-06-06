import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router';
import { http, HttpResponse } from 'msw';

import { apiSlice } from '../features/api/apiSlice';
import { SingleCard } from '../components/SingleCard';
import { server } from './mocks/node';
import { NotFoundDetailsProps } from '../components/NotFoundDetails';

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
    store.dispatch(apiSlice.util.resetApiState());
  });

  const renderComponent = (initialEntries = ['/character/1']) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/character/:id" element={<SingleCard />} />
            <Route path="/" element={<div>Main Page Content</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('render character and action buttons', async () => {
    server.use(
      http.get('**/character/:id', () => {
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

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /rick sanchez/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();

    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();

    const refetchButton = screen.getByRole('button', {
      name: /refetch details/i,
    });
    fireEvent.click(refetchButton);
    const closeButton = screen.getByRole('button', { name: 'x' });
    fireEvent.click(closeButton);
    expect(screen.getByText('Main Page Content')).toBeInTheDocument();
  });

  test('render error 404', async () => {
    server.use(
      http.get('**/character/:id', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    renderComponent(['/character/999']);

    await waitFor(() => {
      expect(
        screen.getByText('Not Found. Please check the search parameters.')
      ).toBeInTheDocument();
    });
  });

  test('render network error', async () => {
    server.use(
      http.get('**/character/:id', () => {
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
      http.get('**/character/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderComponent(['/character/1']);

    await waitFor(() => {
      expect(
        screen.getByText('Server error. Code: 500. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});
