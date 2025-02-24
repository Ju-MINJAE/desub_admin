export interface Subscriber {
  name: string;
  email: string;
  phone: string;
  status: '진행중' | '일시정지';
  startDate: string;
  endDate: string;
  expiryDate: string;
  user: {
    email: string;
    id: string;
    phone: string;
    username: string;
  };
}

export interface SubscriberCountProps {
  totalCount: number;
  newCount: number;
  pausedCount: number;
}

export type SortField = 'name' | 'email' | 'phone' | 'startDate' | 'endDate' | 'expiryDate';
export type SortOrder = 'asc' | 'desc';
