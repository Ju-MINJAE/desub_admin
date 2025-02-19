import { HeaderItem } from '@/types/tableHeader';
import React, { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';
import { Product, ProductSortField } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  onSelectMainProduct?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export default function ProductTable({
  products,
  onSelectMainProduct,
  onDelete,
}: ProductTableProps) {
  const [sortField, setSortField] = useState<ProductSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: ProductSortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder('asc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  const COMBINED_HEADERS: HeaderItem<ProductSortField>[] = [
    { field: undefined, label: 'No.', type: 'static' },
    { field: 'plan_name', label: '제목', type: 'sortable' },
    { field: 'price', label: '월 결제금액', type: 'sortable' },
    { field: 'period', label: '구독 단위', type: 'sortable' },
    { field: undefined, label: '대표 상품', type: 'static' },
    { field: undefined, label: '삭제', type: 'static' },
  ];

  return (
    <div className="overflow-x-auto pt-[1.5rem]">
      <table className="w-full">
        <thead>
          <tr className="border-y bg-[#F3F3F3]">
            {COMBINED_HEADERS.map((header, index) =>
              header.type === 'sortable' && header.field ? (
                <SortableHeader<ProductSortField>
                  key={header.field}
                  field={header.field}
                  label={header.label}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              ) : (
                <th key={index} className="px-3 py-4 text-[1.5rem] text-center">
                  {header.label}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product, index) => (
            <tr key={product.id} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">{paginatedProducts.length - index}</td>
              <td className="py-4 text-[1.5rem] text-center">{product.plan_name}</td>
              <td className="py-4 text-[1.5rem] text-center">{product.price.toLocaleString()}원</td>
              <td className="py-4 text-[1.5rem] text-center">{product.period}</td>
              <td className="py-4 text-[1.5rem] text-center">
                <button
                  onClick={() => onSelectMainProduct?.(product)}
                  className={`px-[2rem] py-[0.8rem] rounded-[0.8rem] ${
                    product.is_active ? 'bg-black text-white' : 'border border-black'
                  }`}
                >
                  {product.is_active ? '선택됨' : '선택'}
                </button>
              </td>
              <td className="py-4 text-[1.5rem] text-center">
                <button
                  onClick={() => onDelete?.(product)}
                  className="px-[2rem] py-[0.8rem] border border-black rounded-[0.8rem]"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length > itemsPerPage && (
        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
