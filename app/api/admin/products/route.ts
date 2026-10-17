import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { products, productVariants, inventory, productNotes } from '@/src/db/schema';
import { safeErrorResponse, AppError } from '@/src/lib/errors';
import { FRAGRANCES } from '@/src/data/fragrances';
import { eq, desc } from 'drizzle-orm';

// Local storage fallback for in-memory modifications during dev/preview
let localOverrides: any[] = [...FRAGRANCES];

export async function GET(req: NextRequest) {
  try {
    try {
      const dbProducts = await db.select().from(products).orderBy(desc(products.createdAt));
      if (dbProducts.length > 0) {
        return NextResponse.json({ success: true, count: dbProducts.length, data: dbProducts });
      }
    } catch {
      // Fallback to catalog data
    }
    return NextResponse.json({ success: true, count: localOverrides.length, data: localOverrides, fallback: true });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, subtitle, price, genderCategory, olfactoryFamily, topNotes, heartNotes, baseNotes, description, stock } = body;

    if (!name || !price) {
      throw new AppError('VALIDATION_ERROR', 'Product name and price are required', 400);
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = {
      id: slug,
      name,
      title: `FUME FRAGRANCES: ${name.toUpperCase()}`,
      subtitle: subtitle || 'Eau de Parfum',
      concentration: 'Eau de Parfum',
      volume: '50 ML / 1.7 FL OZ',
      price: Number(price),
      genderCategory: genderCategory || 'UNISEX',
      olfactoryFamily: olfactoryFamily || 'ORIENTAL',
      gender: genderCategory === 'FOR HIM' ? 'him' : genderCategory === 'FOR HER' ? 'her' : 'unisex',
      families: [(olfactoryFamily || 'oriental').toLowerCase()],
      discovery: false,
      notesLine: `Top: ${topNotes || 'Bergamot'} | Heart: ${heartNotes || 'Rose'} | Base: ${baseNotes || 'Amber'}`,
      image: '/bottles/arab.webp',
      topNotes: topNotes || 'Calabrian Bergamot',
      heartNotes: heartNotes || 'Florentine Iris',
      baseNotes: baseNotes || 'Royal Oud',
      description: description || 'Master-crafted artisanal Eau de Parfum.',
      productType: 'impression',
      inStock: stock !== undefined ? Number(stock) > 0 : true,
      stock: stock !== undefined ? Number(stock) : 50,
      pastelBg: '#F5F2EF',
      pastelAccent: '#211E1D',
      pastelGlow: 'rgba(33, 30, 29, 0.08)',
      cardTone: 'impression'
    };

    localOverrides.unshift(newProduct);

    // Try DB insert
    try {
      await db.insert(products).values({
        name,
        slug,
        price: String(price),
        currency: 'PKR',
        shortDescription: subtitle,
        description,
        published: true
      });
    } catch {
      // Ignored if DB paused
    }

    return NextResponse.json({ success: true, message: `Product ${name} added successfully`, data: newProduct });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, price, stock, description, inStock } = body;

    if (!id) {
      throw new AppError('VALIDATION_ERROR', 'Product ID is required', 400);
    }

    const idx = localOverrides.findIndex(p => p.id === id);
    if (idx > -1) {
      if (price !== undefined) localOverrides[idx].price = Number(price);
      if (stock !== undefined) localOverrides[idx].stock = Number(stock);
      if (description !== undefined) localOverrides[idx].description = description;
      if (inStock !== undefined) localOverrides[idx].inStock = Boolean(inStock);
    }

    // Try DB update
    try {
      await db
        .update(products)
        .set({
          ...(price !== undefined ? { price: String(price) } : {}),
          ...(description !== undefined ? { description } : {}),
          updatedAt: new Date()
        })
        .where(eq(products.slug, id));
    } catch {
      // Ignored if DB paused
    }

    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      throw new AppError('VALIDATION_ERROR', 'Product ID required', 400);
    }

    localOverrides = localOverrides.filter(p => p.id !== id);

    try {
      await db.delete(products).where(eq(products.slug, id));
    } catch {
      // Ignored if DB paused
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
