import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '../components/Search';
import ErrorBoundary from '../components/ErrorBoundary';

const mockShowCards = jest.fn();

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('render input and buttons', () => {
    render(<Search showCards={mockShowCards} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const testButton = screen.getByRole('button', { name: /test/i });
    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(testButton).toBeInTheDocument();
  });

  test('typing in the input', () => {
    render(<Search showCards={mockShowCards} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    expect(input).toHaveValue('bulbasaur');
  });

  // The search button AND Pressing the Enter key are working correctly

  test('The search button is working correctly', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    render(<Search showCards={mockShowCards} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: '     charmeleon    ' } });
    fireEvent.click(searchButton);
    expect(mockShowCards).toHaveBeenCalledWith('charmeleon');
    // check localStorage
    expect(spy).toHaveBeenCalledWith('userValue', 'charmeleon');
    expect(localStorage.getItem('userValue')).toBe('charmeleon');
    spy.mockRestore();
  });

  test('Pressing the Enter key works correctly', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    render(<Search showCards={mockShowCards} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: '  kakuna  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockShowCards).toHaveBeenCalledWith('kakuna');
    // check localStorage
    expect(spy).toHaveBeenCalledWith('userValue', 'kakuna');
    expect(localStorage.getItem('userValue')).toBe('kakuna');
    spy.mockRestore();
  });

  test('Pressing any other key except Enter, the card display function is not called', () => {
    render(<Search showCards={mockShowCards} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.keyDown(input, { key: 'f', code: 'KeyF' });
    expect(mockShowCards).not.toHaveBeenCalled();
  });

  test('The test button is working correctly, catches error and display fallback UI', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Search showCards={mockShowCards} />
      </ErrorBoundary>
    );
    const testButton = screen.getByRole('button', { name: /test/i });
    fireEvent.click(testButton);
    expect(
      screen.getByText(
        /An error has occurred. You can refresh the page to start over./i
      )
    ).toBeInTheDocument();
    spy.mockRestore();
  });
});
