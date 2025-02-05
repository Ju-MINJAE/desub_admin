export interface Review {
  name: string;
  email: string;
  phone: string;
  reviewRating: string;
  reviewContent: '상세보기';
}

export interface ReviewCountProps {
  totalCount: number;
}

export type ReviewSortField = 'name' | 'email' | 'phone' | 'reviewRating';
