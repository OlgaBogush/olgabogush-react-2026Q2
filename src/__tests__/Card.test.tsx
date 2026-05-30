import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import '@testing-library/jest-dom';

import { Card } from '../components/Card';
import { favouritesReducer } from '../features/favourites/favouritesSlice';

describe('Card Component', () => {
  const mockProps = {
    id: 42,
    name: 'summer smith',
    image: 'https://rickandmortyapi.com',
  };

  const createMockStore = (
    initialState = { favourites: { favourites: [] } }
  ) => {
    return configureStore({
      reducer: {
        favourites: favouritesReducer,
      },
      preloadedState: initialState,
    });
  };

  test('render', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('summer smith')).toBeInTheDocument();

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockProps.image);
    expect(imgElement).toHaveAttribute('alt', mockProps.name);
  });
});
