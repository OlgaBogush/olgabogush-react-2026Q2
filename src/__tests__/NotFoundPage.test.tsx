import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../pages/NotFoundPage';

const mockNavigate = jest.fn();
let mockLocationState: { message: string } | null = null;

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: mockLocationState,
  }),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocationState = null;
  });

  test('empty location.state', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /to the main page/i })
    ).toBeInTheDocument();
  });

  test('showing location.state.message', () => {
    mockLocationState = { message: '404 - Page Not Found' };

    render(<NotFoundPage />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
  });

  test('redirect to main page', () => {
    render(<NotFoundPage />);

    const button = screen.getByRole('button', { name: /to the main page/i });

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
