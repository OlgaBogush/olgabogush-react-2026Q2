import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const mockSetPage = jest.fn();

  test('calls setPage when next or prev buttons are clicked', () => {
    render(<Pagination page={2} setPage={mockSetPage} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    const prevButton = screen.getByRole('button', { name: /prev/i });

    fireEvent.click(nextButton);
    expect(mockSetPage).toHaveBeenCalledWith(3);

    fireEvent.click(prevButton);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });
});
