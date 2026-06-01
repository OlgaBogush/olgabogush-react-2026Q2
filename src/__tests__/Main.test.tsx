import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import '@testing-library/jest-dom';

import { Main } from '../pages/Main';
import { useGetCardsQuery } from '../features/api/apiSlice';

const mockNavigate = jest.fn();
const mockRefetch = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../features/api/apiSlice', () => ({
  useGetCardsQuery: jest.fn(),
}));

jest.mock('../components/Search', () => ({
  Search: () => <div data-testid="search-mock" />,
}));

jest.mock('../components/CardsList', () => ({
  CardsList: () => <div data-testid="cards-list-mock" />,
}));

jest.mock('../components/Pagination', () => ({
  Pagination: () => (
    <button
      data-testid="pagination-mock"
      onClick={() => mockNavigate('/?page=2')}
    />
  ),
}));

jest.mock('../components/loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

describe('Main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('render Loader', () => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('render cardsList', () => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Rick', image: 'url' }] },
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByTestId('cards-list-mock')).toBeInTheDocument();
  });

  test('render NotFoundPage', () => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 404 },
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Not Found. Please check the search parameters.')
    ).toBeInTheDocument();
  });

  test('render when search filter finds nothing ', () => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Morty', image: 'url' }] },
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter initialEntries={['/?name=Rick']}>
        <Main />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        'Nothing was found for your query. Please check the search parameters.'
      )
    ).toBeInTheDocument();
  });

  test('Refetch Cards and Pagination', () => {
    (useGetCardsQuery as jest.Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Morty', image: 'url' }] },
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const refetchButton = screen.getByRole('button', {
      name: /Refetch Cards/i,
    });
    fireEvent.click(refetchButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);

    const pageButton = screen.getByTestId('pagination-mock');
    fireEvent.click(pageButton);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
