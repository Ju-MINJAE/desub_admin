import { ChevronDown, ChevronUp } from 'lucide-react';

interface SortableHeaderProps<T extends string> {
  field: T;
  label: string;
  sortField: T | null;
  sortOrder: 'asc' | 'desc';
  onSort: (field: T) => void;
}

export default function SortableHeader<T extends string>({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
}: SortableHeaderProps<T>) {
  return (
    <th
      className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center justify-center">
        {label}
        <span className="inline-flex flex-col ml-2">
          <ChevronUp
            size={14}
            className={`${
              sortField === field && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
            }`}
          />
          <ChevronDown
            size={14}
            className={`${
              sortField === field && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
            }`}
          />
        </span>
      </div>
    </th>
  );
}
