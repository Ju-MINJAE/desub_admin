export interface Review {
  name: string;
  email: string;
  phone: string;
  reviewRating: string;
  reviewContent: string;
}

export interface ReviewCountProps {
  totalCount: number;
}

export type ReviewSortField = 'name' | 'email' | 'phone' | 'reviewRating';

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
  customerRating: string;
  customerContent: string;
}
