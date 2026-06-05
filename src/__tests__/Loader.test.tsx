import { render, screen } from '@testing-library/react';

import { Loader } from '../components/loader/Loader';

describe('Loader', () => {
  test('render', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader');

    expect(loaderElement).toBeInTheDocument();
  });
});
