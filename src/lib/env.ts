// Environment validation — never exposes actual values
type EnvStatus = 'PRESENT' | 'MISSING';

interface EnvReport {
  NEXT_PUBLIC_SUPABASE_URL: EnvStatus;
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: EnvStatus;
  DATABASE_URL: EnvStatus;
  SUPABASE_SECRET_KEY: EnvStatus;
  DIRECT_URL: EnvStatus;
}

function status(key: string): EnvStatus {
  return process.env[key] ? 'PRESENT' : 'MISSING';
}

export function validateEnv(): { valid: boolean; report: EnvReport } {
  const report: EnvReport = {
    NEXT_PUBLIC_SUPABASE_URL: status('NEXT_PUBLIC_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: status('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
    DATABASE_URL: status('DATABASE_URL'),
    SUPABASE_SECRET_KEY: status('SUPABASE_SECRET_KEY'),
    DIRECT_URL: status('DIRECT_URL'),
  };

  const valid =
    report.DATABASE_URL === 'PRESENT' &&
    report.SUPABASE_SECRET_KEY === 'PRESENT' &&
    report.NEXT_PUBLIC_SUPABASE_URL === 'PRESENT' &&
    report.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY === 'PRESENT';

  return { valid, report };
}

export function getServerEnv() {
  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY!,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  };
}
