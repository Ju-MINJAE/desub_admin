export interface Sale {
  payDate: string;
  price: string;
  content: string;
  name: string;
  email: string;
  phone: string;
}

export interface SalesCountProps {
  monthTotalSales: number;
  monthCancelSales: number;
}

export type SaleSortField = 'payDate' | 'price' | 'content' | 'name' | 'email' | 'phone';
