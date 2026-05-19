import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Main from '../pages/Main';
import { CardsListProps, DataItem } from '../components/CardsList';
import { SingleCardProps } from '../components/SingleCard';
import { PaginationProps } from '../components/Pagination';

const mockSetSearchParams = jest.fn();
let mockParams = new URLSearchParams();

jest.mock('react-router', () => ({
  useSearchParams: () => [mockParams, mockSetSearchParams],
}));

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
    function MockCardsList({ data, onCardClick }: CardsListProps) {
      return (
        <div data-testid="cards-list">
          {data.map((item: DataItem) => (
            <button
              key={item.id}
              data-testid={`card-${item.id}`}
              onClick={() => onCardClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      );
    }
);

jest.mock(
  '../components/SingleCard',
  () =>
    function MockSingleCard({ id, handleCloseCard }: SingleCardProps) {
      return (
        <div data-testid="single-card">
          <span>userId: {id}</span>
          <button data-testid="close-card-btn" onClick={handleCloseCard}>
            Close
          </button>
        </div>
      );
    }
);

jest.mock(
  '../components/Pagination',
  () =>
    function MockPagination({ page, setPage }: PaginationProps) {
      return (
        <div data-testid="pagination">
          <span>Current Page: {page}</span>
          <button data-testid="next-page-btn" onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      );
    }
);

const mockData: DataItem[] = [
  { id: 10, name: 'Pikachu', image: 'https://example.com' },
  { id: 20, name: 'Bulbasaur', image: 'https://example.com' },
];

describe('Main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockParams = new URLSearchParams();
  });

  test('Loader', () => {
    render(<Main data={mockData} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  });

  test('render', () => {
    render(<Main data={mockData} isLoading={false} />);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('cards-list')).toBeInTheDocument();
    expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    expect(screen.queryByTestId('single-card')).not.toBeInTheDocument();
  });

  test('call handlePageChange', () => {
    mockParams.set('page', '2');
    mockParams.set('id', '10');

    render(<Main data={mockData} isLoading={false} />);

    const nextPageBtn = screen.getByTestId('next-page-btn');
    fireEvent.click(nextPageBtn);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      page: '3',
    });
  });

  test('call handleSelectCard', () => {
    mockParams.set('page', '2');
    mockParams.set('search', 'yellow');

    render(<Main data={mockData} isLoading={false} />);

    const cardBtn = screen.getByTestId('card-20');
    fireEvent.click(cardBtn);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      page: '2',
      search: 'yellow',
      id: '20',
    });
  });

  test('SingleCard', () => {
    mockParams.set('page', '1');
    mockParams.set('id', '10');

    render(<Main data={mockData} isLoading={false} />);

    expect(screen.getByTestId('single-card')).toBeInTheDocument();
    expect(screen.getByText('userId: 10')).toBeInTheDocument();

    const closeBtn = screen.getByTestId('close-card-btn');
    fireEvent.click(closeBtn);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      page: '1',
    });
  });
});
