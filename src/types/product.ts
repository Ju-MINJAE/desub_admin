export interface Product {
  id: number;
  plan_name: string;
  price: number;
  period: string;
  is_active?: boolean;
}

export type ProductSortField = 'plan_name' | 'price' | 'period';
