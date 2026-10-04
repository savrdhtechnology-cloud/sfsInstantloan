# Savrdh Instant Loan

Premium animated loan assistance website and CRM for **Savrdh Financial Services Private Limited**. Contact: **+91 8109995906**.

## Stack

Native **Next.js 16 App Router**, React 19, TypeScript, Framer Motion, Supabase Auth/Postgres. Self-hosted variable fonts. Vercel-ready; no Vinext or Sites runtime dependencies.

## Routes

- `/`: animated responsive website, loan options, live EMI calculator, FAQ, call/WhatsApp links.
- `/apply`: three-step validated application and consent; private tracking code and downloadable receipt after successful persistence.
- `/track`: status lookup using application reference plus a high-entropy private code.
- `/login`: staff email/password authentication and password recovery.
- `/crm`: protected workspace with overview, applications/search/stage filters/select/export, pipeline, follow-ups, reports, staff roster and settings.
- `/privacy`, `/terms`: customer-facing notices.

## Current activation status

The dedicated **Financial Services Supabase organization/project is not connected**. Existing AI Workforce and EngageX databases were not modified. Without configuration, the website works, the CRM renders a clearly marked empty preview, online submission/login are disabled, and APIs return 503. There is no fake submission success or seeded customer data.

## Local development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

## Database activation

1. Create/select a **new dedicated SFS Instant Loan project in the Financial Services organization**. Do not run this bootstrap in another product's database.
2. Run `database/bootstrap.sql` once in that new project's SQL editor. The schema is also tested against a local WASM Postgres instance; it has not been applied to a hosted project yet.
3. Add these environment variables to Vercel Preview and Production:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only)
   - `APPLICATION_HASH_SECRET` (server only, random minimum 32 bytes; preserve for idempotent tracking receipts)
   - `NEXT_PUBLIC_SITE_URL` (canonical HTTPS site URL)
4. In Supabase Auth, set Site URL and allow `<site>/auth/callback` for the exact deployed domains. Configure a verified SMTP sender before using recovery emails at scale.
5. Create the first administrator in **Supabase Auth** with the owner's chosen email, then add that exact Auth UUID to `public.staff` as `admin`. Never grant privileges from user-editable metadata.
6. Redeploy. The CRM automatically requires authenticated active staff when configuration is present. Test a genuine application, tracking, login and authorized updates before sharing publicly.

No service-role credential is exposed to the browser. The public form sends only to the server endpoint; anonymous users have no table privileges. Intake RPC execution is restricted to service_role. Per-IP hourly throttling, duplicate active-mobile checks, idempotency and audit records run atomically inside Postgres.

## Staff roles

| Role    | Visibility            | Updates                                                   |
| ------- | --------------------- | --------------------------------------------------------- |
| Admin   | All applications      | Assignment, workflow, verified disbursement               |
| Manager | All applications      | Assignment and workflow; no disbursement                  |
| Agent   | Assigned applications | Workflow/follow-up/notes; no reassignment or disbursement |
| Finance | All applications      | Workflow and verified disbursement; no reassignment       |

Only administrators of the database can enroll staff. Verified transaction IDs are unique and disbursement values become immutable. Notes and transitions are recorded in the activity timeline. CRM contact actions open the phone, WhatsApp or email client; they do not auto-send messages or claim delivery.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

Tests cover the EMI calculation, intake idempotency, duplicate mobile rejection, anonymous/outsider isolation, assigned-agent access, secret-column protection, finance-only verification, required disbursement evidence and immutable verified records.

## Operating limits

The CRM loads the latest 1,000 accessible applications and reports are calculated from that loaded set. Uploaded KYC documents, lender integrations, OTP SMS, automatic emails and payment collection are not implemented. The initial form intentionally does not collect PAN/Aadhaar/bank credentials. Loan rates, approval guarantees, lender affiliations and testimonials are not invented. Before public launch, the company should confirm product availability and its final customer-facing notices.
