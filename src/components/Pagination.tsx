'use client';

import { FC } from 'react';

export interface PaginationProps {
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        className="min-w-20 h-8 text-base bg-gray-300 rounded-sm disabled:opacity-50 cursor-pointer"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        prev
      </button>
      <p className="text-base">{currentPage}</p>
      <button
        className="min-w-20 h-8 text-base bg-gray-300 rounded-sm disabled:opacity-50 cursor-pointer"
        disabled={currentPage >= 42}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        next
      </button>
    </div>
  );
};
