import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Resolve Supabase URL with safe fallbacks across Vite, Next, Node, and browser
const getSupabaseUrl = (): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    const metaEnv = (import.meta as any).env;
    if (metaEnv.VITE_SUPABASE_URL) return metaEnv.VITE_SUPABASE_URL;
    if (metaEnv.NEXT_PUBLIC_SUPABASE_URL) return metaEnv.NEXT_PUBLIC_SUPABASE_URL;
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.VITE_SUPABASE_URL) return process.env.VITE_SUPABASE_URL;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) return process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
  return 'https://ziedbinslsctvedxegnc.supabase.co';
};

// Resolve Supabase Publishable / Anon Key with safe fallbacks
const getSupabaseKey = (): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    const metaEnv = (import.meta as any).env;
    if (metaEnv.VITE_SUPABASE_ANON_KEY) return metaEnv.VITE_SUPABASE_ANON_KEY;
    if (metaEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return metaEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.VITE_SUPABASE_ANON_KEY) return process.env.VITE_SUPABASE_ANON_KEY;
    if (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  }
  return 'sb_publishable_DfSg5D_SKH4XqFfMK13hsQ_hbMxj9re';
};

// Safe fallback client so the UI never crashes if Supabase is offline or misconfigured
function createFallbackClient(): SupabaseClient {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({
        data: { user: null, session: null },
        error: new Error('Supabase authentication service unavailable'),
      }),
      signUp: async () => ({
        data: { user: null, session: null },
        error: new Error('Supabase registration service unavailable'),
      }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ data: {}, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  } as unknown as SupabaseClient;
}

function initSupabase(): SupabaseClient {
  try {
    const url = getSupabaseUrl();
    const key = getSupabaseKey();
    if (url && key && url.startsWith('http')) {
      return createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
  } catch (err) {
    console.warn('[FUME] Supabase client initialization fallback active:', err);
  }
  return createFallbackClient();
}

export const supabaseClient = initSupabase();
