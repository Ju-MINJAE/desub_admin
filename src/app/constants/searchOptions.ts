import { Cancellation } from "@/types/cancellation";
import { SearchOption, Subscriber } from "@/types/subscriber";

export const cancellationSearchOptions: SearchOption<Cancellation>[] = [
  { value: "name", label: "이름", inputType: "text" },
  { value: "email", label: "이메일", inputType: "text" },
  { value: "phone", label: "전화번호", inputType: "text" },
  { value: "cancelDate", label: "취소일자", inputType: "date" },
  {
    value: "cancelReason",
    label: "취소사유",
    inputType: "select",
    options: [
      { value: "가격이 비싸서", label: "가격이 비싸서" },
      {
        value: "퀄리티가 마음에 들지 않아서",
        label: "퀄리티가 마음에 들지 않아서",
      },
      { value: "소통이 느려서", label: "소통이 느려서" },
      {
        value: "정직원을 구하는 것이 더 편해서",
        label: "정직원을 구하는 것이 더 편해서",
      },
      { value: "회사 예산이 줄어들어서", label: "회사 예산이 줄어들어서" },
      { value: "기타", label: "기타" },
    ],
  },
];

export const subscriberSearchOptions: SearchOption<Subscriber>[] = [
  { value: "name", label: "이름", inputType: "text" },
  { value: "email", label: "이메일", inputType: "text" },
  { value: "phone", label: "전화번호", inputType: "text" },
  {
    value: "status",
    label: "구독현황",
    inputType: "select",
    options: [
      { value: "진행중", label: "진행중" },
      { value: "일시정지", label: "일시정지" },
    ],
  },
  { value: "startDate", label: "최초결제일", inputType: "date" },
  { value: "endDate", label: "최근결제일", inputType: "date" },
  { value: "expiryDate", label: "구독만료일", inputType: "date" },
];
