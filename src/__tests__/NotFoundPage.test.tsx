import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from '../features/cards/cardsSlice';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';

import { NotFoundPage } from '../pages/NotFoundPage';
import { AppStore } from '../app/store';

describe('NotFoundPage', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: { cards: cardsReducer },
    });
  });

  test('render', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 (Not Found)')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /go to the main page/i })
    ).toBeInTheDocument();
  });

  test('redirect', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /go to the main page/i });

    fireEvent.click(button);

    expect(store.getState().cards.isLoading).toBe(true);
    expect(store.getState().cards.errorState).toBeNull();
  });
});
