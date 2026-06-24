import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Search } from '../components/Search';

describe('Search', () => {
  const renderSearch = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Search />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('render placeholder and buttons', () => {
    renderSearch();

    expect(screen.getByPlaceholderText('Search character')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();
  });

  test('type into input', () => {
    renderSearch();
    const input = screen.getByPlaceholderText(
      'Search character'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(input.value).toBe('Rick');
  });

  test('save value to localStorage and update url', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Search character');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '  Morty  ' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('userValue')).toBe('morty');
  });

  test('search by pressing Enter', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Search character');

    fireEvent.change(input, { target: { value: 'Summer' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(localStorage.getItem('userValue')).toBe('summer');
  });

  test('render ErrorComponent', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    renderSearch();
    const testButton = screen.getByRole('button', { name: 'Test' });

    expect(() => {
      fireEvent.click(testButton);
    }).toThrow('Test error for errorboundary');

    consoleErrorSpy.mockRestore();
  });
});
