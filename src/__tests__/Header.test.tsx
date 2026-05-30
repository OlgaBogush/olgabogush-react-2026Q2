import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

import { Header } from '../pages/Header';
import { ThemeContext } from '../context/ThemeContext';

describe('Header', () => {
  test('render', () => {
    const mockThemeValue = {
      isDarkTheme: false,
      toggleTheme: jest.fn(),
    };
    render(
      <ThemeContext.Provider value={mockThemeValue}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeContext.Provider>
    );
    expect(screen.getByText(/The Rick and Morty/i)).toBeInTheDocument();
  });
});
