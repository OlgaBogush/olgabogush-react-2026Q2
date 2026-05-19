import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from '../pages/Footer';

describe('Footer', () => {
  test('render', () => {
    render(<Footer />);
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });
});
