-- Add hero_background_url column to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN hero_background_url TEXT;