import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardsList, { DataItem } from '../components/CardsList';

describe('CardList', () => {
  const mockArray: DataItem[] = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  test('render cards', () => {
    render(<CardsList data={mockArray} />);
    const arrayOfImages = screen.getAllByRole('img');
    expect(arrayOfImages).toHaveLength(4);
  });
});
