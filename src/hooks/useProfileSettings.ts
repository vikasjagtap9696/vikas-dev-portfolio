import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProfileSettings {
  id: string;
  avatar_url: string | null;
  hero_background_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  email: string | null;
  about_image_url: string | null;
  hero_name: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_bio: string | null;
  about_intro: string | null;
  about_description: string | null;
  about_education_primary: string | null;
  about_education_secondary: string | null;
  career_goals: string[] | null;
  stat_years_experience: string | null;
  stat_projects_completed: string | null;
  stat_technologies: string | null;
  stat_client_satisfaction: string | null;
  footer_tagline: string | null;
  footer_copyright: string | null;
  footer_location: string | null;
}

export function useProfileSettings() {
  return useQuery({
    queryKey: ["profile-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      return data as ProfileSettings;
    },
  });
}

export function useUpdateProfileSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: { 
      id: string; 
      avatar_url?: string | null; 
      hero_background_url?: string | null;
      github_url?: string | null;
      linkedin_url?: string | null;
      twitter_url?: string | null;
      email?: string | null;
      about_image_url?: string | null;
      hero_name?: string | null;
      hero_title?: string | null;
      hero_subtitle?: string | null;
      hero_bio?: string | null;
      about_intro?: string | null;
      about_description?: string | null;
      about_education_primary?: string | null;
      about_education_secondary?: string | null;
      career_goals?: string[] | null;
      stat_years_experience?: string | null;
      stat_projects_completed?: string | null;
      stat_technologies?: string | null;
      stat_client_satisfaction?: string | null;
      footer_tagline?: string | null;
      footer_copyright?: string | null;
      footer_location?: string | null;
    }) => {
      const { id, ...fieldsToUpdate } = updates;
      const { error } = await supabase
        .from("profile_settings")
        .update(fieldsToUpdate)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-settings"] });
    },
  });
}

export function useUploadHeroBackground() {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `hero-background.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      return data.publicUrl;
    },
  });
}

export function useUploadAvatar() {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `profile-avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      return data.publicUrl;
    },
  });
}

export function useUploadAboutImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `about-image.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      return data.publicUrl;
    },
  });
}
