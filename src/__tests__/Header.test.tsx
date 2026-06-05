import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ThemeContext } from '../context/ThemeContext';
import { Header } from '../pages/Header';

describe('Header', () => {
  const mockToggleTheme = vi.fn();

  const renderHeader = (isDarkTheme = false) => {
    return render(
      <ThemeContext.Provider
        value={{ isDarkTheme, toggleTheme: mockToggleTheme }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  test('render title and navlinks', () => {
    renderHeader();

    expect(screen.getByText('The Rick and Morty')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('null for ThemeContext', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  test('display Dark button', () => {
    renderHeader(false);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Dark');
  });

  test('display Light button', () => {
    renderHeader(true);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Light');
  });

  test('toggleTheme', () => {
    renderHeader();
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
