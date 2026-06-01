import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import '@testing-library/jest-dom';

import { SingleCard } from '../components/SingleCard';
import { useGetSingleCardQuery } from '../features/api/apiSlice';

const mockNavigate = jest.fn();
const mockRefetch = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '12' }),
}));

jest.mock('../features/api/apiSlice', () => ({
  useGetSingleCardQuery: jest.fn(),
}));

jest.mock('../components/loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

jest.mock('../components/NotFoundDetails', () => ({
  NotFoundDetails: ({
    errorMessageForDetails,
  }: {
    errorMessageForDetails: string;
  }) => <div data-testid="not-found-details">{errorMessageForDetails}</div>,
}));

describe('SingleCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render Loader', () => {
    (useGetSingleCardQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <SingleCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('render character details', () => {
    const character = {
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      image: 'rick-image.jpg',
      created: '2017-11-04',
    };

    (useGetSingleCardQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <SingleCard />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('2017-11-04')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'x' });
    fireEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');

    const refetchButton = screen.getByRole('button', {
      name: /Refetch Details/i,
    });
    fireEvent.click(refetchButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test('render message when character is not found', () => {
    (useGetSingleCardQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 404 },
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <SingleCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-details')).toHaveTextContent(
      'Character not found. Please try again.'
    );
  });

  test('render message when FETCH_ERROR', () => {
    (useGetSingleCardQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 'FETCH_ERROR' },
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <SingleCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-details')).toHaveTextContent(
      'Network error. Please try again later.'
    );
  });

  test('render message for server error', () => {
    (useGetSingleCardQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 500 },
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <SingleCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-details')).toHaveTextContent(
      'Server error. Code: 500.'
    );
  });

  test('render message for application error', () => {
    (useGetSingleCardQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { message: 'Something went wrong.' },
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <SingleCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-details')).toHaveTextContent(
      'Something went wrong.'
    );
  });
});
