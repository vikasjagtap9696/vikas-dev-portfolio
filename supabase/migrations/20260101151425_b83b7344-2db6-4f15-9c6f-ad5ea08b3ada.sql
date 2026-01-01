-- Add footer content columns to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN footer_tagline TEXT,
ADD COLUMN footer_copyright TEXT,
ADD COLUMN footer_location TEXT;