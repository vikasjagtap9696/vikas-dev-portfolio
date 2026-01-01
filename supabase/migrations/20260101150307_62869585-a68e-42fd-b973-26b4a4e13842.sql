-- Add about text columns to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN about_intro TEXT,
ADD COLUMN about_description TEXT,
ADD COLUMN about_education_primary TEXT,
ADD COLUMN about_education_secondary TEXT;