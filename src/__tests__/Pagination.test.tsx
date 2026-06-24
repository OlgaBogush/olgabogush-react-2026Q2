import { render, screen, fireEvent } from '@testing-library/react';

import { Pagination } from '../components/Pagination';

describe('Pagination', () => {
  const mockHandlePageChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('display current page', () => {
    render(
      <Pagination currentPage={5} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('block prev button on the first page', () => {
    render(
      <Pagination currentPage={1} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
  });

  test('block next button on the last page', () => {
    render(
      <Pagination currentPage={42} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.getByRole('button', { name: /prev/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  test('call handlePageChange when the prev button is clicked', () => {
    render(
      <Pagination currentPage={5} handlePageChange={mockHandlePageChange} />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
    expect(mockHandlePageChange).toHaveBeenCalledWith(4);
  });

  test('call handlePageChange when the next button is clicked', () => {
    render(
      <Pagination currentPage={5} handlePageChange={mockHandlePageChange} />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
    expect(mockHandlePageChange).toHaveBeenCalledWith(6);
  });
});
