import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import SingleCard from '../components/SingleCard';
import showSingleCard from '../api/showSingleCard';

jest.mock('../api/showSingleCard', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('../components/loader/Loader', () => {
  return function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  };
});

const mockCardData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  gender: 'Male',
  image: 'https://rickandmortyapi.com',
  created: '2017-11-04T18:48:46.250Z',
};

describe('SingleCard', () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('call try successfully', async () => {
    (showSingleCard as unknown as jest.Mock).mockResolvedValue(mockCardData);

    render(<SingleCard id="1" handleCloseCard={mockHandleClose} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCardData.image);
  });

  test('error', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockError = new Error('Test API Error');

    (showSingleCard as unknown as jest.Mock).mockRejectedValue(mockError);

    render(<SingleCard id="1" handleCloseCard={mockHandleClose} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  test('not call fetchCard', async () => {
    render(<SingleCard id="" handleCloseCard={mockHandleClose} />);

    expect(showSingleCard).not.toHaveBeenCalled();
  });
});
