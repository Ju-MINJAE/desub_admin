import { Cancellation } from '@/types/cancellation';
import { Customer } from '@/types/customer';
import { Review } from '@/types/review';
import { Sale } from '@/types/sales';
import { SearchOption, Subscriber } from '@/types/subscriber';

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
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
  {
    value: 'status',
    label: '구독현황',
    inputType: 'select',
    options: [
      { value: '진행중', label: '진행중' },
      { value: '일시정지', label: '일시정지' },
    ],
  },
  { value: 'startDate', label: '최초결제일', inputType: 'date' },
  { value: 'endDate', label: '최근결제일', inputType: 'date' },
  { value: 'expiryDate', label: '구독만료일', inputType: 'date' },
];

export const reviewSearchOptions: SearchOption<Review>[] = [
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
  { value: 'reviewRating',
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
  { value: 'subscription',
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
  { value: 'payDate', label: '결제일', inputType: 'date' },
  { value: 'price', label: '금액', inputType: 'text' },
  {
    value: 'content',
    label: '내용',
    inputType: 'select',
    options: [
      { value: '결제', label: '결제' },
      { value: '구독취소', label: '구독취소' },
    ],
  },
  { value: 'name', label: '이름', inputType: 'text' },
  { value: 'email', label: '이메일', inputType: 'text' },
  { value: 'phone', label: '전화번호', inputType: 'text' },
];
