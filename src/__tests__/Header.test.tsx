import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../pages/Header';

describe('Header', () => {
  test('render', () => {
    render(<Header />);
    expect(screen.getByText(/header/i)).toBeInTheDocument();
  });
});
