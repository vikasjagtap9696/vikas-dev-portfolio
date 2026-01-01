-- Add hero text columns to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN hero_name TEXT,
ADD COLUMN hero_title TEXT,
ADD COLUMN hero_subtitle TEXT,
ADD COLUMN hero_bio TEXT;