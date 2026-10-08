import { NextRequest, NextResponse } from 'next/server';
import { getPublishedCollections, getCollectionBySlug } from '@/src/db/queries/collections';
import { safeErrorResponse } from '@/src/lib/errors';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const collection = await getCollectionBySlug(slug);
      if (!collection) {
        return NextResponse.json(
          { error: 'Collection not found', code: 'NOT_FOUND', statusCode: 404 },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: collection });
    }

    const collections = await getPublishedCollections();
    return NextResponse.json({ success: true, count: collections.length, data: collections });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
