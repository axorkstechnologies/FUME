import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/src/db/mutations/orders';
import { safeErrorResponse } from '@/src/lib/errors';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found', code: 'NOT_FOUND', statusCode: 404 },
        { status: 404 }
      );
    }

    // Return sanitized customer confirmation
    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        currency: order.currency,
        subtotal: order.subtotal,
        discountAmount: order.discountAmount,
        shippingAmount: order.shippingAmount,
        grandTotal: order.grandTotal,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          productName: i.productName,
          variantName: i.variantName,
          sizeMl: i.sizeMl,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          lineTotal: i.lineTotal,
        })),
        shippingAddress: order.shippingAddress
          ? {
              firstName: order.shippingAddress.firstName,
              lastName: order.shippingAddress.lastName,
              addressLine1: order.shippingAddress.addressLine1,
              city: order.shippingAddress.city,
              country: order.shippingAddress.country,
            }
          : null,
      },
    });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
