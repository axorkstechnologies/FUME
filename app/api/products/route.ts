import { NextRequest, NextResponse } from 'next/server';
import { getPublishedProducts, searchProducts } from '@/src/db/queries/products';
import { safeErrorResponse } from '@/src/lib/errors';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const scentFamily = searchParams.get('family') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0;

    if (search && search.trim().length > 0) {
      const results = await searchProducts(search.trim(), { limit, offset });
      return NextResponse.json({ success: true, count: results.length, data: results });
    }

    const products = await getPublishedProducts(
      { scentFamily, featured },
      { limit, offset }
    );

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
