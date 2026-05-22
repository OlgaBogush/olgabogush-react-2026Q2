import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

import About from '../components/About';

describe('About Component', () => {
  test('render', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('React course:')).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: 'OlgaBogush' });
    const courseLink = screen.getByRole('link', {
      name: 'RS School React course',
    });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/OlgaBogush');
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
