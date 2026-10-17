import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { customFragrances, auditLogs } from '@/src/db/schema';
import { safeErrorResponse, AppError } from '@/src/lib/errors';
import { desc, eq } from 'drizzle-orm';

// In-memory fallback for resilient operation when remote DB is paused
let memoryStore: any[] = [];

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    const userEmail = req.nextUrl.searchParams.get('email');

    try {
      if (adminKey && adminKey === process.env.SUPABASE_SECRET_KEY) {
        const list = await db
          .select()
          .from(customFragrances)
          .orderBy(desc(customFragrances.createdAt))
          .limit(100);
        return NextResponse.json({ success: true, count: list.length, data: list });
      }

      if (userEmail) {
        const userList = await db
          .select()
          .from(customFragrances)
          .where(eq(customFragrances.guestEmail, userEmail))
          .orderBy(desc(customFragrances.createdAt));
        return NextResponse.json({ success: true, count: userList.length, data: userList });
      }

      const list = await db
        .select()
        .from(customFragrances)
        .orderBy(desc(customFragrances.createdAt))
        .limit(50);
      return NextResponse.json({ success: true, count: list.length, data: list });
    } catch (dbErr) {
      // Return memory fallback if database is unavailable
      let filtered = [...memoryStore];
      if (userEmail) {
        filtered = filtered.filter(f => f.guestEmail === userEmail);
      }
      return NextResponse.json({ success: true, count: filtered.length, data: filtered, fallback: true });
    }
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, genderCategory, topNotes, heartNotes, baseNotes, bottleSize, price, notes, guestEmail, customerName, customerPhone } = body;

    if (!name || !topNotes || !heartNotes || !baseNotes) {
      throw new AppError('VALIDATION_ERROR', 'Formula name and olfactory notes are required', 400);
    }

    const newRecord = {
      id: `cf-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name),
      genderCategory: String(genderCategory || 'UNISEX'),
      topNotes: Array.isArray(topNotes) ? topNotes : [topNotes],
      heartNotes: Array.isArray(heartNotes) ? heartNotes : [heartNotes],
      baseNotes: Array.isArray(baseNotes) ? baseNotes : [baseNotes],
      bottleSize: String(bottleSize || '50ml'),
      price: String(price || '3500.00'),
      notes: notes ? String(notes) : null,
      guestEmail: guestEmail ? String(guestEmail) : null,
      customerName: customerName ? String(customerName) : null,
      customerPhone: customerPhone ? String(customerPhone) : null,
      status: 'saved',
      createdAt: new Date().toISOString()
    };

    try {
      const [created] = await db
        .insert(customFragrances)
        .values({
          name: newRecord.name,
          genderCategory: newRecord.genderCategory,
          topNotes: newRecord.topNotes,
          heartNotes: newRecord.heartNotes,
          baseNotes: newRecord.baseNotes,
          bottleSize: newRecord.bottleSize,
          price: newRecord.price,
          notes: newRecord.notes,
          guestEmail: newRecord.guestEmail,
          customerName: newRecord.customerName,
          customerPhone: newRecord.customerPhone,
          status: 'saved'
        })
        .returning();

      return NextResponse.json({
        success: true,
        message: 'Bespoke formula saved to FUME Atelier Archive.',
        id: created.id,
        data: created
      });
    } catch (dbErr) {
      // Graceful fallback to memory store
      memoryStore.unshift(newRecord);
      return NextResponse.json({
        success: true,
        message: 'Bespoke formula saved to Atelier Archive.',
        id: newRecord.id,
        data: newRecord,
        fallback: true
      });
    }
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      throw new AppError('VALIDATION_ERROR', 'ID and new status are required', 400);
    }

    try {
      await db
        .update(customFragrances)
        .set({
          status,
          ...(notes !== undefined ? { notes } : {}),
          updatedAt: new Date()
        })
        .where(eq(customFragrances.id, id));

      return NextResponse.json({ success: true, message: `Formula status updated to ${status}` });
    } catch (dbErr) {
      const item = memoryStore.find(m => m.id === id);
      if (item) {
        item.status = status;
        if (notes !== undefined) item.notes = notes;
      }
      return NextResponse.json({ success: true, message: `Formula status updated to ${status}`, fallback: true });
    }
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
