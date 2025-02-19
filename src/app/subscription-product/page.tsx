'use client';

import { Product } from '@/types/product';
import { useState } from 'react';
import ProductTable from '../components/subscription-product/ProductTable';

export default function ProductManagement() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 2,
      plan_name: '5% 할인 구독',
      price: 1187500,
      period: 'monthly',
    },
    {
      id: 1,
      plan_name: '얼리버드 프로모션 15%',
      price: 1062500,
      period: 'yearly',
    },
  ]);

  const handleSelectMainProduct = (product: Product) => {
    setSelectedProduct(product);
    setProducts(
      products.map(p => ({
        ...p,
        isSelected: p.id === product.id,
      })),
    );
  };

  return (
    <div className="pl-[28.5rem] whitespace-nowrap">
      <div className="p-[3.1rem]">
        <div className="flex justify-between mt-[2.1rem] items-center">
          <h1 className="text-[3.5rem] font-bold">구독상품관리</h1>
          <button className="flex items-center bg-black text-white px-[2rem] py-[1rem] rounded-[1.2rem]">
            신규상품 등록
          </button>
        </div>
        <div className="pt-[5rem] pb-[2.8rem] space-y-8">
          <p className="text-[2.5rem] font-medium">대표 구독상품 정보</p>
          <div className="flex items-center gap-[5rem]">
            <span className="text-[1.7rem]">월 결제금액</span>
            <span className="text-[1.7rem] font-bold">
              {selectedProduct ? selectedProduct.price.toLocaleString() : 1250000} 원
            </span>
          </div>
        </div>

        <div className="text-[2.5rem] font-medium">구독상품 리스트</div>
        <ProductTable products={products} />
      </div>
    </div>
  );
}
