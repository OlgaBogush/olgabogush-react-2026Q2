import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router';
import '@testing-library/jest-dom';

import Main from '../pages/Main';
import showCards from '../api/showCards';
import { CardsListProps } from '../components/CardsList';
import { PaginationProps } from '../components/Pagination';

jest.mock('../api/showCards', () => jest.fn());

function LocationSpy({ onChange }: { onChange: (path: string) => void }) {
  const location = useLocation();
  onChange(location.pathname + location.search);
  return null;
}

jest.mock(
  '../components/Search',
  () =>
    function MockSearch() {
      return <div>Search</div>;
    }
);

jest.mock(
  '../components/loader/Loader',
  () =>
    function MockLoader() {
      return <div data-testid="loader">Loading...</div>;
    }
);

jest.mock(
  '../components/CardsList',
  () =>
    function MockCardsList({ data }: CardsListProps) {
      return (
        <div data-testid="cards-list">
          {data.map((item) => (
            <div key={item.id} data-testid={`card-${item.id}`}>
              {item.name}
            </div>
          ))}
        </div>
      );
    }
);

jest.mock(
  '../components/Pagination',
  () =>
    function MockPagination({
      currentPage,
      handlePageChange,
    }: PaginationProps) {
      return (
        <button
          data-testid="next-page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }
);

const mockData = [
  { id: 10, name: 'Pikachu' },
  { id: 20, name: 'Bulbasaur' },
];

describe('Main', () => {
  let currentUrl = '';

  const renderMain = (initialPath = '/') => {
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <LocationSpy
          onChange={(url) => {
            currentUrl = url;
          }}
        />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/error" element={<div>Error Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  const runTimersAndPromises = async () => {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await act(async () => {
      await Promise.resolve();
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test('Loader', async () => {
    (showCards as jest.Mock).mockResolvedValueOnce(mockData);
    renderMain();

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await runTimersAndPromises();

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('card-10')).toHaveTextContent('Pikachu');
  });

  test('filters cards', async () => {
    (showCards as jest.Mock).mockResolvedValueOnce(mockData);
    renderMain('/?name=Pika');

    await runTimersAndPromises();

    expect(screen.getByTestId('card-10')).toBeInTheDocument();
    expect(screen.queryByTestId('card-20')).not.toBeInTheDocument();
  });

  test('navigate', async () => {
    (showCards as jest.Mock).mockResolvedValueOnce(mockData);
    renderMain();
    await runTimersAndPromises();

    fireEvent.click(screen.getByTestId('next-page-btn'));

    expect(currentUrl).toBe('/?page=2');
  });

  test('redirect', async () => {
    (showCards as jest.Mock).mockResolvedValueOnce([]);
    renderMain();

    await runTimersAndPromises();

    expect(currentUrl).toBe('/error');
  });

  afterEach(() => {
    jest.useRealTimers();
    (console.log as jest.Mock).mockRestore();
  });
});
