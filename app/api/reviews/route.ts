import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { reviews } from '@/src/db/schema';
import { reviewSchema } from '@/src/lib/validation/schemas';
import { safeErrorResponse, AppError } from '@/src/lib/errors';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      throw new AppError('VALIDATION_ERROR', 'productId parameter is required', 400);
    }

    // Only return moderated 'approved' reviews to storefront
    const list = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        title: reviews.title,
        body: reviews.body,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(and(eq(reviews.productId, productId), eq(reviews.status, 'approved')))
      .orderBy(desc(reviews.createdAt));

    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', parsed.error.issues[0]?.message || 'Invalid review data', 400);
    }

    const [created] = await db
      .insert(reviews)
      .values({
        productId: parsed.data.productId,
        rating: parsed.data.rating,
        title: parsed.data.title || null,
        body: parsed.data.body || null,
        status: 'pending', // Moderation required
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Review submitted for moderation. Thank you for sharing your experience.',
      id: created.id,
    });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
