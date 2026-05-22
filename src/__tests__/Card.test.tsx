import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

import Card from '../components/Card';

describe('Card Component', () => {
  const mockProps = {
    id: 42,
    name: 'summer smith',
    image: 'https://rickandmortyapi.com',
  };

  test('render', () => {
    render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('summer smith')).toBeInTheDocument();

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockProps.image);
    expect(imgElement).toHaveAttribute('alt', mockProps.name);
  });
});
