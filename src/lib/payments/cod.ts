import 'server-only';
import { PaymentProvider, PaymentResult, PaymentStatus } from './types';

export class CodPaymentProvider implements PaymentProvider {
  async createPayment(params: {
    orderId: string;
    amount: string;
    currency: string;
    metadata?: Record<string, unknown>;
  }): Promise<PaymentResult> {
    return {
      success: true,
      status: 'pending',
      message: 'Cash on Delivery payment registered. Amount payable upon receipt.',
      metadata: {
        method: 'COD',
        currency: params.currency || 'PKR',
        ...params.metadata,
      },
    };
  }

  async verifyPayment(params: {
    paymentId: string;
    providerPaymentId?: string;
  }): Promise<PaymentResult> {
    // For COD, payment is verified physically upon delivery and updated by courier/admin
    return {
      success: true,
      status: 'pending',
      message: 'COD payments are verified upon physical courier delivery.',
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    return 'pending';
  }
}

export const codProvider = new CodPaymentProvider();
