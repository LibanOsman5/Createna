// Supabase client utilities for Next.js App Router
// Multi-tenant SaaS architecture with RLS

import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

// ═══ Browser Client (Client Components) ═══
// Uses the anonymous key — RLS enforces data access
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ═══ Server Client (Server Components, Server Actions, Route Handlers) ═══
// Uses the user's session cookie for RLS
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component — ignore, middleware handles refresh
          }
        },
      },
    }
  );
}

// ═══ Service Role Client (Server-only, bypasses RLS) ═══
// ONLY use in webhooks, background jobs, and admin operations
// NEVER expose to client or use in user-facing routes
export async function createServiceClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
