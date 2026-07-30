# The Vitanoin Collective — Landing

Convocatoria para 500 creadoras de contenido de skincare y belleza (Laboratorios Panalab).

Next.js 15 (App Router) + Tailwind CSS + Supabase.

## Local setup

```bash
npm install
cp .env.local.example .env.local   # then fill in the two values
npm run dev
```

`.env.local` is gitignored and must never be committed.

| Variable | Secret? | Where to find it |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | no | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no | Supabase → Settings → API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | **yes** | Supabase → Settings → API → `service_role` |
| `ADMIN_PASSWORD` | **yes** | Choose a long random value |

The `service_role` key bypasses Row Level Security — anyone holding it can read
and modify every application. It must never be given a `NEXT_PUBLIC_` prefix,
and it is only ever imported by modules marked `server-only`, so an accidental
client import fails the build instead of shipping the key to browsers.

## Database

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor. It is
idempotent, so it is safe to re-run after adding columns. It creates:

- the `vitanoin_applicants` table,
- a unique index on `lower(email)` — the "correo ya registrado" message depends on it,
- the review columns (`status`, `reviewed_at`, `admin_notes`) used by the dashboard,
- indexes on `status`, `follower_count` and `created_at` for the dashboard filters,
- an RLS policy allowing anonymous `insert` only, and only in the `pendiente`
  state. Anonymous users cannot read applications back, and cannot insert
  themselves as `seleccionada` by posting directly to the API.

Submissions fail until this has been run. Re-run it after pulling changes that
add columns.

## Deployment

Pushes to `main` deploy to Vercel automatically. All four environment variables
must be set in **Vercel → Settings → Environment Variables**, scoped to the
Production environment, otherwise the form returns a handled "no disponible"
error and the dashboard reports the missing key.

`NEXT_PUBLIC_*` values are inlined at build time, so **adding or changing a
variable requires a redeploy** — an existing deployment will not pick it up.

If the production URL redirects visitors to a Vercel login page, disable
**Settings → Deployment Protection → Vercel Authentication**.

## Admin dashboard

`/admin`, password-protected with `ADMIN_PASSWORD`. Sessions last 8 hours and
are held in an httpOnly, signed cookie; changing the password invalidates every
existing session.

Use it to narrow the applicant pool down to the 500 selected creators:

- **Filters** — free-text search (name, email, handle, city), follower range,
  minimum engagement rate, minimum average Reel views, category, time creating
  content, whether they already work with brands, and review status. Filter
  state lives in the URL, so a view can be bookmarked or shared.
- **Sorting** by followers, engagement, average views, registration date or name.
- **Review** — mark an applicant `seleccionada`, `descartada` or back to
  `pendiente`, individually or in bulk across everything matching the current
  filters. A counter tracks progress toward the 500 and flags going over.
- **Export to Excel** — downloads an `.xlsx` of exactly the rows matching the
  current filters, with numbers kept as numbers so they can be sorted and
  totalled in Excel.

Read and write access uses the `service_role` key from server components and
server actions only. The dashboard is `noindex` and never statically cached.

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
