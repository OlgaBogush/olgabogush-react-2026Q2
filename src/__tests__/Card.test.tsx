import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card, { CardProps } from '../components/Card';

describe('Card', () => {
  const mockData: CardProps = {
    name: 'raticate',
    url: 'https://pokeapi.co/api/v2/pokemon/20/',
  };

  test('render card', () => {
    render(<Card name={mockData.name} url={mockData.url} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('alt', 'raticate');
    const nameElement = screen.getByText(/raticate/i);
    expect(nameElement).toBeInTheDocument();
    const urlElement = screen.getByText(
      'https://pokeapi.co/api/v2/pokemon/20/'
    );
    expect(urlElement).toBeInTheDocument();
  });
});
