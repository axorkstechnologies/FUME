import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { orders } from '@/src/db/schema';
import { updateOrderStatus } from '@/src/db/mutations/orders';
import { adminOrderStatusSchema } from '@/src/lib/validation/schemas';
import { safeErrorResponse, AppError } from '@/src/lib/errors';
import { desc } from 'drizzle-orm';
import { OrderStatus } from '@/src/lib/commerce/order-state';

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.SUPABASE_SECRET_KEY) {
      throw new AppError('ADMIN_AUTH_ERROR', 'Unauthorized administrative access', 403);
    }

    const list = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(50);

    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.SUPABASE_SECRET_KEY) {
      throw new AppError('ADMIN_AUTH_ERROR', 'Unauthorized administrative access', 403);
    }

    const body = await req.json();
    const parsed = adminOrderStatusSchema.safeParse(body);
    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', 'Invalid status update payload', 400);
    }

    await updateOrderStatus(
      parsed.data.orderId,
      parsed.data.newStatus as OrderStatus,
      undefined,
      parsed.data.note
    );

    return NextResponse.json({ success: true, message: `Order status transitioned to ${parsed.data.newStatus}` });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
