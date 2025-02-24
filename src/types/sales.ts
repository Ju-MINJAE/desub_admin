export interface Sale {
  transaction_date: string;
  transaction_amount: string;
  transaction_type: string;
  user: {
    email: string;
    name: string;
    phone: string;
    id?: string;
  };
}

export interface SalesCountProps {
  monthTotalSales: number;
  monthCancelSales: number;
}

export type SaleSortField =
  | 'transaction_date'
  | 'transaction_amount'
  | 'transaction_type'
  | 'user.name'
  | 'user.email'
  | 'user.phone';
