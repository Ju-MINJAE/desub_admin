'use client';

import { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import ProductTable from '../components/subscription-product/ProductTable';
import { getAccessToken } from '@/actions/auth/getAccessToken';
import ProductModal from '../components/subscription-product/ProductModal';
import ProductDeleteModal from '../components/subscription-product/ProductDeleteModal';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProductManagement() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // 상품 목록을 불러오는 api 호출
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/plans/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('상품 목록을 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setProducts(data);
      // console.log(data);

      const mainProduct = data.find((product: Product) => product.is_active);
      if (mainProduct) {
        setSelectedProduct(mainProduct);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('상품 목록을 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 대표 상품을 선택하는 api 호출
  const handleSelectMainProduct = async (product: Product) => {
    try {
      const { accessToken } = await getAccessToken();

      const response = await fetch(`${BASEURL}/api/plans/${product.id}/active/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('대표상품 설정에 실패했습니다');
      }

      fetchProducts();
      setSelectedProduct(product);
    } catch (error) {
      console.error('Failed to select main product:', error);
      alert('대표상품 설정에 실패했습니다');
    }
  };

  // 상품을 삭제하는 api 호출
  const handleDeleteConfirm = async (product: Product) => {
    try {
      const { accessToken } = await getAccessToken();
      console.log('Deleting product:', product.id);

      const response = await fetch(`${BASEURL}/api/plans/${product.id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('상품 삭제에 실패했습니다');
      }

      fetchProducts();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('상품 삭제에 실패했습니다');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsConfirmModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="pl-[28.5rem] whitespace-nowrap">
        <div className="p-[3.1rem] flex justify-center items-center">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pl-[28.5rem] whitespace-nowrap">
        <div className="p-[3.1rem] text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="pl-[28.5rem] whitespace-nowrap">
      <div className="p-[3.1rem]">
        <div className="flex justify-between mt-[2.1rem] items-center">
          <h1 className="text-[3.5rem] font-bold">구독상품관리</h1>
          <button
            onClick={handleOpenModal}
            className="flex items-center bg-black text-white px-[2rem] py-[1rem] rounded-[1.2rem]"
          >
            신규상품 등록
          </button>
        </div>
        <div className="pt-[5rem] pb-[2.8rem] space-y-8">
          <p className="text-[2.5rem] font-medium">대표 구독상품 정보</p>
          <div className="flex items-center gap-[5rem]">
            <span className="text-[1.7rem]">월 결제금액</span>
            <span className="text-[1.7rem] font-bold">
              {selectedProduct ? selectedProduct.price.toLocaleString() : 0} 원
            </span>
          </div>
        </div>

        <div className="text-[2.5rem] font-medium">구독상품 리스트</div>
        <ProductTable
          products={products}
          onSelectMainProduct={handleSelectMainProduct}
          onDeleteClick={handleDeleteClick}
        />
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchProducts();
          }}
        />
        <ProductDeleteModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={async () => {
            if (productToDelete) {
              await handleDeleteConfirm(productToDelete);
            }
          }}
        />
      </div>
    </div>
  );
}
