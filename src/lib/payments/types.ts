export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  providerPaymentId?: string;
  status: PaymentStatus;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentProvider {
  createPayment(params: {
    orderId: string;
    amount: string;
    currency: string;
    metadata?: Record<string, unknown>;
  }): Promise<PaymentResult>;

  verifyPayment(params: {
    paymentId: string;
    providerPaymentId?: string;
  }): Promise<PaymentResult>;

  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;

  refundPayment?(params: {
    paymentId: string;
    amount?: string;
    reason?: string;
  }): Promise<PaymentResult>;
}
