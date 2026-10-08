import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/src/db/queries/products';
import { safeErrorResponse } from '@/src/lib/errors';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found', code: 'NOT_FOUND', statusCode: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
