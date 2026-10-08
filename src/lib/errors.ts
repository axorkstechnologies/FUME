export type ErrorCode =
  | 'AUTH_ERROR'
  | 'DB_ERROR'
  | 'CHECKOUT_ERROR'
  | 'INVENTORY_ERROR'
  | 'PAYMENT_ERROR'
  | 'ORDER_ERROR'
  | 'STORAGE_ERROR'
  | 'VALIDATION_ERROR'
  | 'ADMIN_AUTH_ERROR'
  | 'NOT_FOUND'
  | 'FORBIDDEN'
  | 'CONFLICT';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function safeErrorResponse(error: unknown): { error: string; code: ErrorCode; statusCode: number } {
  if (error instanceof AppError) {
    return { error: error.message, code: error.code, statusCode: error.statusCode };
  }
  // Never leak internal details
  console.error('[INTERNAL_ERROR]', error instanceof Error ? error.message : 'Unknown error');
  return { error: 'An unexpected error occurred.', code: 'DB_ERROR', statusCode: 500 };
}
