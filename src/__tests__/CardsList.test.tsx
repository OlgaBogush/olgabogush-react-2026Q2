import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CardsList } from '../components/CardsList';

jest.mock('../components/Card', () => ({
  Card: function MockCard({ name }: { name: string }) {
    return <li>{name}</li>;
  },
}));

describe('CardsList', () => {
  const mockData = [
    { id: 1, name: 'Rick Sanchez', image: 'https://rickandmortyapi.com' },
    { id: 2, name: 'Morty Smith', image: 'https://rickandmortyapi.com' },
    { id: 3, name: 'Summer Smith', image: 'https://rickandmortyapi.com' },
  ];

  test('render list', () => {
    render(<CardsList data={mockData} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Summer Smith')).toBeInTheDocument();
  });
});
