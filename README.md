# The Vitanoin Collective — Landing

Convocatoria para 500 creadoras de contenido de skincare y belleza (Laboratorios Panalab).

Next.js 15 (App Router) + Tailwind CSS + Supabase.

## Local setup

```bash
npm install
cp .env.local.example .env.local   # then fill in the two values
npm run dev
```

`.env.local` is gitignored and must never be committed. Both values come from
the Supabase dashboard under **Settings → API**:

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys → `anon` `public` |

## Database

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor. It is
idempotent, so it is safe to re-run after adding columns. It creates:

- the `vitanoin_applicants` table,
- a unique index on `lower(email)` — the "correo ya registrado" message depends on it,
- an RLS policy allowing anonymous `insert` only. Anonymous users cannot read
  applications back.

Submissions fail until this has been run.

## Deployment

Pushes to `main` deploy to Vercel automatically. The same two environment
variables must be set in **Vercel → Settings → Environment Variables** for the
Production environment, otherwise the form returns a handled "no disponible"
error instead of saving.

If the production URL redirects visitors to a Vercel login page, disable
**Settings → Deployment Protection → Vercel Authentication**.

## Form

Fields and consent wording follow `01_Formulario_Landing_The_Vitanoin_Collective`.
Validation applied server-side in [`app/actions/submit-form.ts`](app/actions/submit-form.ts):

- applicant must be 18 or older (computed from `birth_date`),
- at least 5,000 followers,
- Instagram profile must be public,
- brand list is required when "¿Colaboras con marcas?" is "Sí",
- all six consents must be checked.

Client-side `required` attributes mirror these, but the server is the
authority — do not rely on the browser checks alone.
