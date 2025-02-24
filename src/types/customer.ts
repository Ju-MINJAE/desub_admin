export interface Customer {
  id: string;
  is_subscribed: string; // 구독중, 미구독
  sub_status: string; // active, none, pause
  created_at: string; // 기존엔 signupDate
  last_login: string;
  marketing_consent: string;
  start_date: string; // 최초 결제일
  last_paid_at: string; //기존 endDate = 최근 결제일
  end_date: string; // 기존 expiryDate = 만료일
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export type CustomerSortField =
  | 'user.name'
  | 'user.email'
  | 'user.phone'
  | 'is_subscribed'
  | 'sub_status'
  | 'created_at'
  | 'last_login'
  | 'marketing_consent'
  | 'start_date'
  | 'last_paid_at'
  | 'end_date';

export type TabType = 'customerList' | 'withdrawalList';

export interface Withdrawal {
  withdrawalDate: string;
  name: string;
  email: string;
  phone: string;
  withdrawalReason?: string;
  withdrawalStatus: boolean;
}

export type WithdrawalSortField =
  | 'withdrawalDate'
  | 'name'
  | 'email'
  | 'phone'
  | 'withdrawalStatus';
