-- Create experiences table
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    period TEXT NOT NULL,
    description TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    is_current BOOLEAN DEFAULT false,
    experience_type TEXT DEFAULT 'job',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for experiences (public read, admin write)
CREATE POLICY "Experiences are viewable by everyone"
ON public.experiences FOR SELECT
USING (true);

CREATE POLICY "Admins can insert experiences"
ON public.experiences FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update experiences"
ON public.experiences FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete experiences"
ON public.experiences FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add update trigger
CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();