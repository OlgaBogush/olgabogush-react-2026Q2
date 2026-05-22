import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import '@testing-library/jest-dom';

import SingleCard from '../components/SingleCard';
import showSingleCard from '../api/showSingleCard';

jest.mock('../api/showSingleCard', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const mockCardData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  gender: 'Male',
  image: 'https://rickandmortyapi.com',
  created: '2017-11-04T18:48:46.250Z',
};

describe('SingleCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders card successfully', async () => {
    (showSingleCard as jest.Mock).mockResolvedValue(mockCardData);

    render(
      <MemoryRouter initialEntries={['/character/1?page=3']}>
        <Routes>
          <Route path="/character/:id" element={<SingleCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByRole('img')).toHaveAttribute('src', mockCardData.image);
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  test('calls navigate when close button is clicked', async () => {
    (showSingleCard as jest.Mock).mockResolvedValue(mockCardData);

    render(
      <MemoryRouter initialEntries={['/1?page=3']}>
        <Routes>
          <Route path="/:id" element={<SingleCard />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = await screen.findByRole('button', { name: 'x' });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=3');
  });

  test('error', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const mockError = new Error('Test API Error');

    (showSingleCard as jest.Mock).mockRejectedValue(mockError);

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<SingleCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });

    consoleSpy.mockRestore();
  });
});
