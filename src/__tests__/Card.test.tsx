import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '../components/Card';

describe('Card Component', () => {
  const mockProps = {
    id: 42,
    name: 'summer smith',
    image: 'https://rickandmortyapi.com',
    onCardClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText('summer smith')).toBeInTheDocument();

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockProps.image);
    expect(imgElement).toHaveAttribute('alt', mockProps.name);
  });

  test('call onCardClick with id', () => {
    render(<Card {...mockProps} />);

    const cardContainer = screen.getByText('summer smith').closest('div');

    if (cardContainer) {
      fireEvent.click(cardContainer);
    }

    expect(mockProps.onCardClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onCardClick).toHaveBeenCalledWith(42);
  });
});
