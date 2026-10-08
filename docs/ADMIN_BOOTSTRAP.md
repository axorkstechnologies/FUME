# FUME FRAGRANCES — Super Admin Bootstrap Procedure

## Overview
Administrative access in FUME is guarded at the database level by Row Level Security and role-based access control (`public.admin_roles`). 
Administrative privileges are never granted automatically or based on client-side state.

---

## One-Time Bootstrap Command

To promote an authenticated account to `super_admin`:

1. Have the site owner sign up via Supabase Auth (or locate their user in the Supabase Dashboard under **Authentication > Users**).
2. Obtain their 36-character `User UID` (e.g. `c7a4b8e2-9f3d-4c1a-8e5b-2a7f9d0c3e1b`).
3. Run the bootstrap script from the terminal:

```bash
npm run admin:promote <SUPABASE_AUTH_USER_UUID>
```

### Safety Guarantees:
- **Existence Verification**: Queries `auth.users` to verify the account actually exists before touching permissions.
- **Server-Only Execution**: Runs entirely server-side with direct PostgreSQL connection; no secrets are printed or sent to the browser.
- **Audit Logged**: An audit event (`SUPER_ADMIN_BOOTSTRAP`) is recorded in `public.audit_logs` capturing the action and timestamp.
- **Non-destructive & Idempotent**: If the user is already `super_admin`, notifies the operator without side-effects.
