import { FC } from 'react';

interface PaginationProps {
  page: number;
  setPage: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <div className="flex gap-4">
      <button
        className="p-2 bg-gray-300 rounded-sm disabled:opacity-50 cursor-pointer"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        prev
      </button>
      <p className="p-2">{page}</p>
      <button
        className="p-2 bg-gray-300 rounded-sm cursor-pointer"
        onClick={() => setPage(page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
