import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Card } from '../components/Card';
import { favouritesReducer } from '../features/favourites/favouritesSlice';

describe('Card', () => {
  const mockProps = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'rick-1.jpeg',
  };

  test('render', () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...mockProps} />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /rick sanchez/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'rick-1.jpeg');
  });

  test('checkbox', () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...mockProps} />
        </BrowserRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const state = store.getState();

    expect(state.favourites.favourites).toContainEqual({
      id: 1,
      name: 'Rick Sanchez',
      image: 'rick-1.jpeg',
    });
  });
});
