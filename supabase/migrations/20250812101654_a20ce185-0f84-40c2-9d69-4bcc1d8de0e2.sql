
-- Add JSONB columns to store the audit answers and the submitted user details
ALTER TABLE public.brand_audits
  ADD COLUMN IF NOT EXISTS answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS user_details jsonb NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.brand_audits.answers IS 'Map of question_id -> selected answer value for the brand audit';
COMMENT ON COLUMN public.brand_audits.user_details IS 'User-submitted details captured at the start of the brand audit (e.g., name, role, industry, website, company)';
