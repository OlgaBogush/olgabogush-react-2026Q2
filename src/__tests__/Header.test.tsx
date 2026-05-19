import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

import Header from '../pages/Header';

describe('Header', () => {
  test('render', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/The Rick and Morty/i)).toBeInTheDocument();
  });
});
