export interface Admin {
  classification: string;
  created_at: string;
  id: string;
  passwordChangedAt: string;
  status: boolean | '-';
  user: {
    email: string;
    name: string;
    phone: string;
  };
}

export type AdminSortField =
  | 'classification'
  | 'user.name'
  | 'user.email'
  | 'user.phone'
  | 'created_at';
