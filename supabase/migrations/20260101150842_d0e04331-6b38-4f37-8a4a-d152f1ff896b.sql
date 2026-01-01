-- Add career_goals column to profile_settings (stored as text array)
ALTER TABLE public.profile_settings
ADD COLUMN career_goals TEXT[];