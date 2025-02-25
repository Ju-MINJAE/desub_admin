export interface Product {
  id?: number;
  plan_name: string;
  price: number;
  period: 'monthly' | 'yearly';
  is_active?: boolean;
}

export type ProductSortField = 'plan_name' | 'price' | 'period';
