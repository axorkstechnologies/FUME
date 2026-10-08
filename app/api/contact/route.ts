import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { contactRequests } from '@/src/db/schema';
import { contactRequestSchema } from '@/src/lib/validation/schemas';
import { safeErrorResponse, AppError } from '@/src/lib/errors';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactRequestSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', parsed.error.issues[0]?.message || 'Invalid form input', 400);
    }

    const [created] = await db
      .insert(contactRequests)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
        status: 'new',
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received by the FUME Concierge team.',
      id: created.id,
    });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
