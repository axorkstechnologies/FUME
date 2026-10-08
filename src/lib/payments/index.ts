import 'server-only';
import { PaymentProvider } from './types';
import { codProvider } from './cod';
import { AppError } from '../errors';

export function getPaymentProvider(method: string): PaymentProvider {
  switch (method.toLowerCase()) {
    case 'cod':
      return codProvider;
    default:
      throw new AppError('PAYMENT_ERROR', `Payment method '${method}' is not supported yet.`, 400);
  }
}

export * from './types';
export * from './cod';
