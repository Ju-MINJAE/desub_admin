export interface Review {
  id?: number;
  content: string;
  createdAt?: string;
  rating: number;
  subs?: string;
  user: {
    email: string;
    id: string;
    phone: string;
    username: string;
  };
}

export interface ReviewCountProps {
  totalCount: number;
}

export type ReviewSortField = 'user.username' | 'user.email' | 'user.phone' | 'rating';

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
  customerRating: number;
  customerContent: string;
}
