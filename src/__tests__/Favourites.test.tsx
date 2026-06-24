import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Favourites } from '../components/Favourites';
import {
  favouritesReducer,
  removeAllItems,
} from '../features/favourites/favouritesSlice';
import { ThemeContext } from '../context/ThemeContext';
import { downloadFile } from '../utils/downloadFile';

vi.mock('../utils/downloadFile', () => ({
  downloadFile: vi.fn(),
}));

describe('Favourites', () => {
  const mockFavourites = [
    { id: 1, name: 'Rick Sanchez', image: 'rick-1.jpeg' },
    { id: 2, name: 'Morty Smith', image: 'morty-2.jpeg' },
  ];

  test('render', () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
    });
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ThemeContext.Provider
          value={{ isDarkTheme: false, toggleTheme: () => {} }}
        >
          <Favourites favourites={mockFavourites} />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/morty smith/i)).toBeInTheDocument();
    expect(screen.getByText(/total:/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(removeButton);
    expect(dispatchSpy).toHaveBeenCalledWith(removeAllItems());

    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);
    expect(downloadFile).toHaveBeenCalledWith(mockFavourites);
  });

  test('empty favourites', () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
    });

    const { container } = render(
      <Provider store={store}>
        <ThemeContext.Provider
          value={{ isDarkTheme: false, toggleTheme: () => {} }}
        >
          <Favourites favourites={[]} />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});
