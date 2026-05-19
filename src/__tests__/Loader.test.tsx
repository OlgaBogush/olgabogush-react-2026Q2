import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Loader from '../components/loader/Loader';

test('Loader', () => {
  render(<Loader />);
  const loaderElement = screen.getByTestId('loader');
  expect(loaderElement).toBeInTheDocument();
});
