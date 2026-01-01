-- Add about_image_url column to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN about_image_url TEXT;