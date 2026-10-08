import 'server-only';
import { db } from '../index';
import { auditLogs } from '../schema';

export async function logAction(params: {
  userId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    await db.insert(auditLogs).values({
      userId: params.userId || null,
      action: params.action,
      entityType: params.entityType || null,
      entityId: params.entityId || null,
      metadata: params.metadata || null,
    });
  } catch (err) {
    // Non-blocking fallback for audit logging
    console.error('[AUDIT_LOG_ERROR]', err);
  }
}
