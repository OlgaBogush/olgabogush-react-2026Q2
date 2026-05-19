import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

import Footer from '../pages/Footer';

describe('Footer', () => {
  test('render', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const rsSchoolLink = screen.getByRole('link', { name: /RS School/i });
    expect(rsSchoolLink).toBeInTheDocument();

    expect(screen.getByText(/Developed by/i)).toBeInTheDocument();
  });
});
