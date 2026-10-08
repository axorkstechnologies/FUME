import 'server-only';
import { SupabaseClient } from '@supabase/supabase-js';
import { db } from '../../db';
import { adminRoles } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../errors';

export async function getCurrentUser(supabase: SupabaseClient) {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return null;
  }
  return user;
}

export async function requireAuth(supabase: SupabaseClient) {
  const user = await getCurrentUser(supabase);
  if (!user) {
    throw new AppError('AUTH_ERROR', 'Authentication required', 401);
  }
  return user;
}

export async function requireAdmin(userId: string) {
  const roleRecord = await db
    .select()
    .from(adminRoles)
    .where(eq(adminRoles.userId, userId))
    .limit(1);

  if (!roleRecord.length || !['super_admin', 'admin'].includes(roleRecord[0].role)) {
    throw new AppError('ADMIN_AUTH_ERROR', 'Elevated administrator privileges required', 403);
  }
  return roleRecord[0];
}

export async function requireRole(userId: string, allowedRoles: string[]) {
  const roleRecord = await db
    .select()
    .from(adminRoles)
    .where(eq(adminRoles.userId, userId))
    .limit(1);

  if (!roleRecord.length || !allowedRoles.includes(roleRecord[0].role)) {
    throw new AppError('FORBIDDEN', 'Insufficient permissions for this operation', 403);
  }
  return roleRecord[0];
}
