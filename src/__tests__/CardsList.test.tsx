import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardsList, { DataItem } from '../components/CardsList';

describe('CardList', () => {
  const mockArray: DataItem[] = [
    {
      id: 1,
      name: 'bulbasaur',
      image: 'https://rickandmortyapi.com/api/character/1/',
    },
    {
      id: 2,
      name: 'ivysaur',
      image: 'https://rickandmortyapi.com/api/character/2/',
    },
    {
      id: 3,
      name: 'venusaur',
      image: 'https://rickandmortyapi.com/api/character/3/',
    },
  ];

  test('render cards', () => {
    render(<CardsList data={mockArray} />);
    const arrayOfImages = screen.getAllByRole('img');
    expect(arrayOfImages).toHaveLength(3);
  });
});
