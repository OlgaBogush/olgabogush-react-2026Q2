import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore, UnknownAction } from '@reduxjs/toolkit';

import '@testing-library/jest-dom';

import { Main } from '../pages/Main';
import { CardsListProps } from '../components/CardsList';
import { PaginationProps } from '../components/Pagination';
import { cardsReducer, resetCardsState } from '../features/cards/cardsSlice';
import { AppStore } from '../app/store';
import { favouritesReducer } from '../features/favourites/favouritesSlice';
import { getCards } from '../utils/getCards';

jest.mock('../utils/getCards', () => {
  const original = jest.requireActual('../utils/getCards');
  const mockFn = jest.fn();

  const mockGetCards = Object.assign(mockFn, {
    pending: 'cards/getCards/pending' as const,
    fulfilled: 'cards/getCards/fulfilled' as const,
    rejected: 'cards/getCards/rejected' as const,
  });

  return {
    ...original,
    getCards: mockGetCards,
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
    store = configureStore({
      reducer: { cards: cardsReducer, favourites: favouritesReducer },
    });
  });

  test('render', async () => {
    const mockAction =
      () => async (dispatch: (action: UnknownAction) => void) => {
        dispatch({ type: 'cards/getCards/pending' });
        dispatch({
          type: 'cards/getCards/fulfilled',
          payload: mockData,
        } as UnknownAction);
      };
    (getCards as unknown as jest.Mock).mockImplementation(mockAction);

    await act(async () => {
      renderMain('/?name=Pika');
    });

    expect(screen.getByTestId('card-10')).toHaveTextContent('Pikachu');

    const nextMockAction =
      () => async (dispatch: (action: UnknownAction) => void) => {
        dispatch({ type: 'cards/getCards/pending' });
        dispatch({
          type: 'cards/getCards/fulfilled',
          payload: [],
        } as UnknownAction);
      };
    (getCards as unknown as jest.Mock).mockImplementation(nextMockAction);

    await act(async () => {
      fireEvent.click(screen.getByTestId('next-page-btn'));
    });

    act(() => {
      store.dispatch(resetCardsState());
    });

    expect(store.getState().cards.cards).toEqual([]);
  });

  test('error', async () => {
    const mockErrorAction =
      () => async (dispatch: (action: UnknownAction) => void) => {
        dispatch({ type: 'cards/getCards/pending' });
        dispatch({
          type: 'cards/getCards/rejected',
          payload: 'Server Error',
        } as UnknownAction);
      };
    (getCards as unknown as jest.Mock).mockImplementation(mockErrorAction);

    await act(async () => {
      renderMain('/');
    });

    expect(screen.getByText('Error Page')).toBeInTheDocument();
  });
});
