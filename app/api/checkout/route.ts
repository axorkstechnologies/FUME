import { NextRequest, NextResponse } from 'next/server';
import { processCheckout } from '@/src/db/mutations/checkout';
import { checkoutSchema } from '@/src/lib/validation/schemas';
import { safeErrorResponse, AppError } from '@/src/lib/errors';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const message = issue ? `${issue.path.join('.')}: ${issue.message}` : 'Validation error';
      throw new AppError('VALIDATION_ERROR', message, 400);
    }

    // Optional user ID extracted from authenticated session headers or null for guests
    const result = await processCheckout(parsed.data);

    return NextResponse.json({
      success: true,
      isDuplicate: result.isDuplicate,
      order: {
        id: result.order.id,
        orderNumber: result.order.orderNumber,
        grandTotal: result.order.grandTotal,
        currency: result.order.currency,
        orderStatus: result.order.orderStatus,
        paymentStatus: result.order.paymentStatus,
        createdAt: result.order.createdAt,
      },
    });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
