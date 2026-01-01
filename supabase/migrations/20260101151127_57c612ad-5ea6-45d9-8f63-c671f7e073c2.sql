-- Add hero stats columns to profile_settings
ALTER TABLE public.profile_settings
ADD COLUMN stat_years_experience TEXT,
ADD COLUMN stat_projects_completed TEXT,
ADD COLUMN stat_technologies TEXT,
ADD COLUMN stat_client_satisfaction TEXT;