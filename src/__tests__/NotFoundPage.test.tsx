import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import '@testing-library/jest-dom';

import { NotFoundPage } from '../pages/NotFoundPage';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render default error message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const defaultText = screen.getByText(
      'Something went wrong. Please try again later.'
    );
    expect(defaultText).toBeInTheDocument();
  });

  test('render custom error message', () => {
    const customError = 'Not Found. Please check the search parameters.';
    render(
      <MemoryRouter>
        <NotFoundPage errorMessage={customError} />
      </MemoryRouter>
    );

    expect(screen.getByText(customError)).toBeInTheDocument();
  });

  test('redirect', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Go to the main page/i });

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
