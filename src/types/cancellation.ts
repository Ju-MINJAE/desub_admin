export interface Cancellation {
  name: string;
  email: string;
  phone: string;
  paymentDate: string;
  cancelDate: string;
  cancelReason: string;
  refundStatus: string;
}

export interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  paymentDate: string;
  amount: number;
  onRefund: (refundAmount: number) => void;
}
