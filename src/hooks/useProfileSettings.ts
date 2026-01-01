import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProfileSettings {
  id: string;
  avatar_url: string | null;
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
    mutationFn: async ({ id, avatar_url }: { id: string; avatar_url: string | null }) => {
      const { error } = await supabase
        .from("profile_settings")
        .update({ avatar_url })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-settings"] });
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
