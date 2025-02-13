import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-[1.6rem] disabled:text-gray-300"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex gap-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`text-[1.6rem] ${currentPage === page ? 'font-bold' : 'text-gray-500'}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-[1.6rem] disabled:text-gray-300"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
