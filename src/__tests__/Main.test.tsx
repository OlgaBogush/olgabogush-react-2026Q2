import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import '@testing-library/jest-dom';

import { Main } from '../pages/Main';
import { CardsListProps } from '../components/CardsList';
import { PaginationProps } from '../components/Pagination';
import { cardsReducer, getCards } from '../features/cards/cardsSlice';
import { AppDispatch, AppStore } from '../app/store';

jest.mock('../features/cards/cardsSlice', () => {
  const original = jest.requireActual('../features/cards/cardsSlice');
  return {
    ...original,
    getCards: jest.fn(),
  };
});

jest.mock('../components/Search', () => ({
  Search: () => <div data-testid="search-mock">Search Mock</div>,
}));

jest.mock('../components/loader/Loader', () => ({
  Loader: function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  },
}));

jest.mock('../components/CardsList', () => ({
  CardsList: function MockCardsList({ data }: CardsListProps) {
    return (
      <div data-testid="cards-list">
        {data.map((item) => (
          <div key={item.id} data-testid={`card-${item.id}`}>
            {item.name}
          </div>
        ))}
      </div>
    );
  },
}));

jest.mock('../components/Pagination', () => ({
  Pagination: function MockPagination({
    currentPage,
    handlePageChange,
  }: PaginationProps) {
    return (
      <button
        data-testid="next-page-btn"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    );
  },
}));

const mockData = [{ id: 10, name: 'Pikachu' }];

describe('Main', () => {
  let store: AppStore;
  const renderMain = (path = '/') =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/error" element={<div>Error Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});

    store = configureStore({ reducer: { cards: cardsReducer } });
  });

  test('render', () => {
    (getCards as unknown as jest.Mock).mockImplementation(
      () => async (dispatch: AppDispatch) => {
        dispatch({ type: 'cards/getCards/fulfilled', payload: mockData });
      }
    );

    renderMain('/?name=Pika');

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('card-10')).toHaveTextContent('Pikachu');

    fireEvent.click(screen.getByTestId('next-page-btn'));

    expect(store.getState().cards.cards).toEqual([]);
    expect(store.getState().cards.isLoading).toBe(true);
  });

  test('error', () => {
    (getCards as unknown as jest.Mock).mockImplementation(
      () => async (dispatch: AppDispatch) => {
        dispatch({
          type: 'cards/getCards/rejected',
          error: { message: 'Server Error' },
        });
      }
    );

    renderMain();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Error Page')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.useRealTimers();
    (console.log as jest.Mock).mockRestore();
  });
});
