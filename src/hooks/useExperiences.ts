import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
      toast.success("Experience added successfully!");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Error adding experience");
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
      toast.success("Experience updated successfully!");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Error updating experience");
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
      toast.success("Experience deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error deleting experience");
      throw error;
    }
  };

  return { experiences, loading, addExperience, updateExperience, deleteExperience, refetch: fetchExperiences };
}
