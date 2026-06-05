import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';

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
      {data.map((item: DataItem) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('../components/loader/Loader', () => ({
  Loader: () => <div>Loading...</div>,
}));

vi.mock('./NotFoundPage', () => ({
  NotFoundPage: ({ errorMessage }: { errorMessage: string }) => (
    <div>{errorMessage}</div>
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
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('render successfully', async () => {
    renderComponent(['/?page=1']);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('cards-list-mock')).toBeInTheDocument();
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  test('filteredData is empty', async () => {
    renderComponent(['/?page=1&name=Paul']);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Nothing was found for your query. Please check the search parameters.'
        )
      ).toBeInTheDocument();
    });
  });

  test('render 404 error', async () => {
    renderComponent(['/?page=19999999']);

    await waitFor(() => {
      expect(
        screen.getByText('Not Found. Please check the search parameters.')
      ).toBeInTheDocument();
    });
  });

  test('render network error', async () => {
    server.use(
      http.get(`${BASE_URL}`, () => {
        return HttpResponse.error();
      })
    );

    renderComponent(['/?page=1']);

    await waitFor(() => {
      expect(
        screen.getByText('Network error. Please try again later.')
      ).toBeInTheDocument();
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
        screen.getByText('Server error. Code: 500. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});
