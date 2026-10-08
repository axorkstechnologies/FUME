import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { inventory, productVariants, products } from '@/src/db/schema';
import { adjustInventory } from '@/src/db/mutations/inventory';
import { safeErrorResponse, AppError } from '@/src/lib/errors';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.SUPABASE_SECRET_KEY) {
      throw new AppError('ADMIN_AUTH_ERROR', 'Unauthorized administrative access', 403);
    }

    const rows = await db
      .select({
        inventory,
        variant: productVariants,
        product: products,
      })
      .from(inventory)
      .innerJoin(productVariants, eq(inventory.variantId, productVariants.id))
      .innerJoin(products, eq(productVariants.productId, products.id));

    return NextResponse.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.SUPABASE_SECRET_KEY) {
      throw new AppError('ADMIN_AUTH_ERROR', 'Unauthorized administrative access', 403);
    }

    const body = await req.json();
    const schema = z.object({
      variantId: z.string().uuid(),
      adjustmentQuantity: z.number().int(),
      reason: z.string().min(1).max(255),
    });

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', 'Invalid inventory adjustment payload', 400);
    }

    await adjustInventory(parsed.data.variantId, parsed.data.adjustmentQuantity, parsed.data.reason);

    return NextResponse.json({ success: true, message: 'Inventory adjusted successfully' });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
