-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Allow public read access to resumes
CREATE POLICY "Resumes are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Allow admins to upload resumes
CREATE POLICY "Admins can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update resumes
CREATE POLICY "Admins can update resumes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete resumes
CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- Create a table to track the current resume
CREATE TABLE public.resume_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_url text,
  file_name text,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resume_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can view resume settings
CREATE POLICY "Resume settings are viewable by everyone"
ON public.resume_settings FOR SELECT
USING (true);

-- Admins can manage resume settings
CREATE POLICY "Admins can insert resume settings"
ON public.resume_settings FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update resume settings"
ON public.resume_settings FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default row
INSERT INTO public.resume_settings (id) VALUES (gen_random_uuid());