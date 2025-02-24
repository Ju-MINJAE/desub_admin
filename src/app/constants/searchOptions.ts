import { Admin } from '@/types/admin';
import { Cancellation } from '@/types/cancellation';
import { Customer, Withdrawal } from '@/types/customer';
import { Review } from '@/types/review';
import { Sale } from '@/types/sales';
import { SearchOption } from '@/types/search';
import { Subscriber } from '@/types/subscriber';

export const cancellationSearchOptions: SearchOption<Cancellation>[] = [
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
  { value: 'cancelDate', label: '취소일자', inputType: 'date' },
  {
    value: 'cancelReason',
    label: '취소사유',
    inputType: 'select',
    options: [
      { value: '가격이 비싸서', label: '가격이 비싸서' },
      {
        value: '퀄리티가 마음에 들지 않아서',
        label: '퀄리티가 마음에 들지 않아서',
      },
      { value: '소통이 느려서', label: '소통이 느려서' },
      {
        value: '정직원을 구하는 것이 더 편해서',
        label: '정직원을 구하는 것이 더 편해서',
      },
      { value: '회사 예산이 줄어들어서', label: '회사 예산이 줄어들어서' },
      { value: '기타', label: '기타' },
    ],
  },
];

export const subscriberSearchOptions: SearchOption<Subscriber>[] = [
  { value: 'user.name', label: '이름', inputType: 'text' },
  { value: 'user.email', label: '이메일', inputType: 'text' },
  { value: 'user.phone', label: '전화번호', inputType: 'text' },
  {
    value: 'user.sub_status',
    label: '구독현황',
    inputType: 'select',
    options: [
      { value: '진행중', label: '진행중' },
      { value: '일시정지', label: '일시정지' },
    ],
  },
  { value: 'first_payment_date', label: '최초결제일', inputType: 'date' },
  { value: 'last_payment_date', label: '최근결제일', inputType: 'date' },
  { value: 'expiry_date', label: '구독만료일', inputType: 'date' },
];

export const reviewSearchOptions: SearchOption<Review>[] = [
  { value: 'user.username', label: '이름', inputType: 'text' },
  { value: 'user.email', label: '이메일', inputType: 'text' },
  { value: 'user.phone', label: '전화번호', inputType: 'text' },
  {
    value: 'rating',
    label: '별점',
    inputType: 'select',
    options: [
      { value: '1', label: '1점' },
      { value: '2', label: '2점' },
      { value: '3', label: '3점' },
      { value: '4', label: '4점' },
      { value: '5', label: '5점' },
    ],
  },
];

export const customerSearchOptions: SearchOption<Customer>[] = [
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
  {
    value: 'subscription',
    label: '구독여부',
    inputType: 'select',
    options: [
      { value: '구독중', label: '구독중' },
      { value: '미구독', label: '미구독' },
    ],
  },
  {
    value: 'status',
    label: '구독현황',
    inputType: 'select',
    options: [
      { value: '진행중', label: '진행중' },
      { value: '일시정지', label: '일시정지' },
      { value: '구독취소', label: '구독취소' },
      { value: '-', label: '-' },
    ],
  },
  { value: 'signupDate', label: '가입일', inputType: 'date' },
  { value: 'lastLoginDate', label: '마지막 방문일', inputType: 'date' },
  { value: 'startDate', label: '최초결제일', inputType: 'date' },
  { value: 'endDate', label: '최근결제일', inputType: 'date' },
  { value: 'expiryDate', label: '구독만료일', inputType: 'date' },
];

export const saleSearchOptions: SearchOption<Sale>[] = [
  { value: 'transaction_date', label: '결제일', inputType: 'date' },
  { value: 'transaction_amount', label: '금액', inputType: 'text' },
  {
    value: 'transaction_type',
    label: '내용',
    inputType: 'select',
    options: [
      { value: '결제', label: '결제' },
      { value: '구독취소', label: '구독취소' },
    ],
  },
  { value: 'user.name', label: '이름', inputType: 'text' },
  { value: 'user.email', label: '이메일', inputType: 'text' },
  { value: 'user.phone', label: '전화번호', inputType: 'text' },
];

export const withdrawalSearchOptions: SearchOption<Withdrawal>[] = [
  { value: 'withdrawalDate', label: '탈퇴신청일', inputType: 'date' },
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
];

export const adminSearchOptions: SearchOption<Admin>[] = [
  {
    value: 'role',
    label: '분류',
    inputType: 'select',
    options: [
      { value: 'Master', label: 'Master' },
      { value: 'Admin', label: 'Admin' },
    ],
  },
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
  { value: 'createdAt', label: '계정 생성일', inputType: 'date' },
];
