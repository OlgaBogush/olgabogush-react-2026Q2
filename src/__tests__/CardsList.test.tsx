import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { favouritesReducer } from '../features/favourites/favouritesSlice';
import { CardsList } from '../components/CardsList';

describe('CardsList', () => {
  const mockData = [
    { id: 1, name: 'Rick Sanchez', image: 'rick-1.jpeg' },
    { id: 2, name: 'Morty Smith', image: 'morty-2.jpeg' },
  ];

  test('render', () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardsList data={mockData} />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /rick sanchez/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /morty smith/i })
    ).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });
});
