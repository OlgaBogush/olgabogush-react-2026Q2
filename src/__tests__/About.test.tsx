import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { About } from '../components/About';

describe('About', () => {
  test('render', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText(/author:/i)).toBeInTheDocument();
    const githubLink = screen.getByRole('link', { name: 'OlgaBogush' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/OlgaBogush');

    expect(screen.getByText(/react course:/i)).toBeInTheDocument();
    const courseLink = screen.getByRole('link', {
      name: 'RS School React course',
    });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
