import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Footer } from '../pages/Footer';

describe('Footer', () => {
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };

  test('display title', () => {
    renderFooter();
    expect(screen.getByText('The Rick and Morty')).toBeInTheDocument();
  });

  test('link to GitHub', () => {
    renderFooter();
    const githubLink = screen.getByRole('link', { name: 'OlgaBogush' });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/OlgaBogush');
  });

  test('link to RS School', () => {
    renderFooter();

    const schoolLink = screen.getByRole('link', { name: 'RS School' });

    expect(schoolLink).toBeInTheDocument();
    expect(schoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
