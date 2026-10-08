import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { conciergeRequests } from '@/src/db/schema';
import { conciergeRequestSchema } from '@/src/lib/validation/schemas';
import { safeErrorResponse, AppError } from '@/src/lib/errors';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = conciergeRequestSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError('VALIDATION_ERROR', parsed.error.issues[0]?.message || 'Invalid concierge request', 400);
    }

    const [created] = await db
      .insert(conciergeRequests)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        requestType: parsed.data.requestType || 'bespoke_atelier',
        message: parsed.data.message,
        preferredContactMethod: parsed.data.preferredContactMethod || 'whatsapp',
        status: 'new',
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Your bespoke concierge request has been lodged.',
      id: created.id,
    });
  } catch (error) {
    const err = safeErrorResponse(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
