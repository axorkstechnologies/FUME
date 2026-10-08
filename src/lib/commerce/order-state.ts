export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'failed_delivery'
  | 'returned'
  | 'refunded';

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['packed', 'cancelled'],
  packed: ['shipped', 'cancelled'],
  shipped: ['out_for_delivery', 'failed_delivery'],
  out_for_delivery: ['delivered', 'failed_delivery'],
  delivered: ['returned', 'refunded'],
  cancelled: [],
  failed_delivery: ['shipped', 'cancelled', 'returned'],
  returned: ['refunded'],
  refunded: [],
};

export function validateTransition(from: OrderStatus, to: OrderStatus): boolean {
  const allowed = VALID_TRANSITIONS[from];
  return !!allowed && allowed.includes(to);
}

export function getValidNextStatuses(current: OrderStatus): OrderStatus[] {
  return VALID_TRANSITIONS[current] || [];
}
