-- Add social media link columns to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN github_url TEXT,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN twitter_url TEXT,
ADD COLUMN email TEXT;