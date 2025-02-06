export interface Customer {
  name: string;
  email: string;
  phone: string;
  subscription: '구독중' | '미구독';
  status: '진행중' | '일시정지' | '구독취소' | '-';
  signupDate: string;
  lastLoginDate: string;
  markegtingConsent: 'Y' | 'N';
  startDate: string;
  endDate: string;
  expiryDate: string;
  history?: string;
}

export type CustomerSortField =
  | 'name'
  | 'email'
  | 'phone'
  | 'subscription'
  | 'status'
  | 'signupDate'
  | 'lastLoginDate'
  | 'markegtingConsent'
  | 'startDate'
  | 'endDate'
  | 'expiryDate';

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
