import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '../components/Search';
import useLocaleStorage from '../hooks/useLocaleStorage';

jest.mock('../hooks/useLocaleStorage', () => jest.fn());

const mockUseLocaleStorage = useLocaleStorage as jest.MockedFunction<
  typeof useLocaleStorage
>;

jest.mock('../components/ErrorComponent', () => {
  return function MockErrorComponent() {
    return <div data-testid="error-component">Error Occurred</div>;
  };
});

describe('Search', () => {
  const mockSetValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseLocaleStorage.mockReturnValue(['', mockSetValue]);
  });

  test('render', () => {
    mockUseLocaleStorage.mockReturnValue(['Character', mockSetValue]);

    render(<Search />);

    const input = screen.getByPlaceholderText(
      'Search character'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Character');
  });

  test('call setValue', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Search character');

    fireEvent.change(input, { target: { value: 'Charizard' } });

    expect(mockSetValue).toHaveBeenCalledWith('Charizard');
  });

  test('call handleSearchSubmit', () => {
    mockUseLocaleStorage.mockReturnValue(['Bulbasaur', mockSetValue]);
    render(<Search />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    expect(mockSetValue).toHaveBeenCalledWith('Bulbasaur');
  });

  test('call handleSearchSubmit with Enter', () => {
    mockUseLocaleStorage.mockReturnValue(['Mewtwo', mockSetValue]);
    render(<Search />);

    const input = screen.getByPlaceholderText('Search character');

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockSetValue).toHaveBeenCalledWith('Mewtwo');
  });

  test('not call handleSearchSubmit with other keys', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Search character');

    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  test('show ErrorComponent with push Test button', () => {
    render(<Search />);

    expect(screen.queryByTestId('error-component')).not.toBeInTheDocument();

    const testButton = screen.getByRole('button', { name: 'Test' });

    fireEvent.click(testButton);

    expect(screen.getByTestId('error-component')).toBeInTheDocument();
  });
});
