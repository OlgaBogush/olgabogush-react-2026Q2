import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

import { Search } from '../components/Search';

jest.mock('../components/ErrorComponent', () => ({
  ErrorComponent: function MockErrorComponent() {
    return <div data-testid="error-component">Error Occurred</div>;
  },
}));

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'setItem');
  });

  test('render', () => {
    localStorage.setItem('userValue', 'rick');

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      'Search character'
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('rick');
  });

  test('call handleSearchSubmit', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search character');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '  Rick  ' } });
    fireEvent.click(searchButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('userValue', 'rick');
  });

  test('call handleSearchSubmit with Enter', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search character');
    fireEvent.change(input, { target: { value: 'morty' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(localStorage.setItem).toHaveBeenCalledWith('userValue', 'morty');
  });

  test('not call handleSearchSubmit with other keys', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search character');
    fireEvent.change(input, { target: { value: 'morty' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test('show ErrorComponent with push Test button', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('error-component')).not.toBeInTheDocument();

    const testButton = screen.getByRole('button', { name: 'Test' });

    fireEvent.click(testButton);

    expect(screen.getByTestId('error-component')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
