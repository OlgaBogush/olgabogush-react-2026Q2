import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { delay, http, HttpResponse } from 'msw';

import { Main } from '../pages/Main';
import { apiSlice } from '../features/api/apiSlice';
import { server } from './mocks/node';
import { BASE_URL } from '../utils/constants';
import { PaginationProps } from '../components/Pagination';
import { CardsListProps, DataItem } from '../components/CardsList';

vi.mock('../components/Search', () => ({
  Search: () => <div data-testid="search-mock">Search Mock</div>,
}));

vi.mock('../components/Pagination', () => ({
  Pagination: ({ currentPage, handlePageChange }: PaginationProps) => (
    <div>
      <span data-testid="current-page">{currentPage}</span>
      <button data-testid="page-btn" onClick={() => handlePageChange(2)}>
        Next Page
      </button>
    </div>
  ),
}));

vi.mock('../components/CardsList', () => ({
  CardsList: ({ data }: CardsListProps) => (
    <div data-testid="cards-list-mock">
      {data.length === 0 ? (
        <div data-testid="empty-cards">No cards found</div>
      ) : (
        data.map((item: DataItem) => <div key={item.id}>{item.name}</div>)
      )}
    </div>
  ),
}));

vi.mock('../components/loader/Loader', () => ({
  Loader: () => <div>Loading...</div>,
}));

const ErrorPageMock = () => {
  const location = useLocation();
  const msg =
    location.state?.msg || 'Something went wrong. Please try again later.';
  return <div data-testid="error-page-mock">{msg}</div>;
};

const createActualStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

describe('Main', () => {
  let store: ReturnType<typeof createActualStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    store = createActualStore();
    store.dispatch(apiSlice.util.resetApiState());
  });

  const renderComponent = (initialEntries = ['/']) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/error" element={<ErrorPageMock />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('render successfully', async () => {
    server.use(
      http.get(`${BASE_URL}`, async () => {
        await delay(50);
        return HttpResponse.json({
          results: [
            { id: 1, name: 'Rick Sanchez' },
            { id: 2, name: 'Morty Smith' },
          ],
        });
      })
    );

    renderComponent(['/?page=1']);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('cards-list-mock')).toBeInTheDocument();
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  test('filteredData is empty', async () => {
    server.use(
      http.get(`${BASE_URL}`, () => {
        return HttpResponse.json({
          results: [
            { id: 1, name: 'Rick Sanchez' },
            { id: 2, name: 'Morty Smith' },
          ],
        });
      })
    );

    renderComponent(['/?page=1&name=Paul']);

    await waitFor(() => {
      expect(screen.getByTestId('empty-cards')).toBeInTheDocument();
    });
  });

  test('render 500 error', async () => {
    server.use(
      http.get(`${BASE_URL}`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderComponent(['/?page=1']);

    await waitFor(() => {
      expect(
        screen.getByText('Server error. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});
