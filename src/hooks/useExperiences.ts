import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  period: string;
  description: string[];
  technologies: string[];
  is_current: boolean;
  experience_type: string;
  display_order: number;
}

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const addExperience = async (experience: Omit<Experience, "id">) => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .insert(experience)
        .select()
        .single();

      if (error) throw error;
      setExperiences([...experiences, data]);
      toast({ title: "Experience added successfully!" });
      return data;
    } catch (error: any) {
      toast({ title: "Error adding experience", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setExperiences(experiences.map(e => e.id === id ? data : e));
      toast({ title: "Experience updated successfully!" });
      return data;
    } catch (error: any) {
      toast({ title: "Error updating experience", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setExperiences(experiences.filter(e => e.id !== id));
      toast({ title: "Experience deleted successfully!" });
    } catch (error: any) {
      toast({ title: "Error deleting experience", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  return { experiences, loading, addExperience, updateExperience, deleteExperience, refetch: fetchExperiences };
}
