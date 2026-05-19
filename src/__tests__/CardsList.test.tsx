import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardsList from '../components/CardsList';

describe('CardsList Component', () => {
  const mockData = [
    { id: 1, name: 'Rick Sanchez', image: 'https://rickandmortyapi.com' },
    { id: 2, name: 'Morty Smith', image: 'https://rickandmortyapi.com' },
    { id: 3, name: 'Summer Smith', image: 'https://rickandmortyapi.com' },
  ];

  const mockOnCardClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render list', () => {
    render(<CardsList data={mockData} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Summer Smith')).toBeInTheDocument();

    const imgElements = screen.getAllByRole('img');
    expect(imgElements).toHaveLength(mockData.length);
  });

  test('call onCardClick with id', () => {
    render(<CardsList data={mockData} onCardClick={mockOnCardClick} />);

    const mortyCard = screen.getByText('Morty Smith').closest('div');

    if (mortyCard) {
      fireEvent.click(mortyCard);
    }

    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith(2);
  });
});
