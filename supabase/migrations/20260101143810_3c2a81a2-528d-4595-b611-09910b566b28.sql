-- Add confirmation email toggle to notification settings
ALTER TABLE public.notification_settings
ADD COLUMN send_confirmation_email BOOLEAN NOT NULL DEFAULT true;