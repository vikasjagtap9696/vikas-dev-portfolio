import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useResume() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: resumeSettings, isLoading } = useQuery({
    queryKey: ["resume-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resume_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const uploadResume = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `resume.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName);

      // Update resume settings
      const { error: updateError } = await supabase
        .from("resume_settings")
        .update({
          file_url: urlData.publicUrl,
          file_name: file.name,
          updated_at: new Date().toISOString(),
        })
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Update all rows

      if (updateError) throw updateError;

      return urlData.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume-settings"] });
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    resumeSettings,
    isLoading,
    uploadResume,
  };
}
