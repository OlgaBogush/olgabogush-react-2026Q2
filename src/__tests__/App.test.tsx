import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';
import showCards from '../api/showCards';
import { MainProps } from '../pages/Main';

jest.mock('../api/showCards', () => jest.fn());

const mockNavigate = jest.fn();
let mockParams = new URLSearchParams();
const mockSetSearchParams = jest.fn((newParams) => {
  mockParams = newParams;
});

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockParams, mockSetSearchParams],
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Route: ({ element, path }: { element: React.ReactNode; path: string }) => (
    <div data-testid={`route-${path}`}>{element}</div>
  ),
}));

jest.mock(
  '../pages/Header',
  () =>
    function MockHeader() {
      return <div data-testid="header">Header</div>;
    }
);
jest.mock(
  '../pages/Footer',
  () =>
    function MockFooter() {
      return <div data-testid="footer">Footer</div>;
    }
);
jest.mock(
  '../components/Search',
  () =>
    function MockSearch() {
      return <div data-testid="search">Search</div>;
    }
);
jest.mock(
  '../pages/Main',
  () =>
    function MockMain({ data, isLoading }: MainProps) {
      return (
        <div data-testid="page-main">
          <span>Items count: {data.length}</span>
          {isLoading && <span>Loading Status</span>}
        </div>
      );
    }
);
jest.mock(
  '../pages/NotFoundPage',
  () =>
    function MockNotFoundPage() {
      return <div data-testid="page-not-found">Not Found Page</div>;
    }
);

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockParams = new URLSearchParams();
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    (console.error as jest.Mock).mockRestore();
  });

  test('init url', () => {
    render(<App />);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  test('get data', async () => {
    const mockCharacters = [{ id: 1, name: 'Rick', image: 'url' }];
    (showCards as jest.Mock).mockResolvedValueOnce(mockCharacters);

    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(showCards).toHaveBeenCalledWith(1);
    expect(screen.getByText('Items count: 1')).toBeInTheDocument();
  });

  test('redirect to error', async () => {
    (showCards as jest.Mock).mockResolvedValueOnce([]);

    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/error');
  });

  test('catch error', async () => {
    const mockError = new Error('API down');
    (showCards as jest.Mock).mockRejectedValueOnce(mockError);

    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(mockNavigate).toHaveBeenCalledWith('/error', {
      state: { message: 'API down' },
    });
  });
});
