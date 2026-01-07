import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  display_order: number;
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const addSkill = async (skill: Omit<Skill, "id">) => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .insert(skill)
        .select()
        .single();

      if (error) throw error;
      setSkills([...skills, data]);
      toast.success("Skill added successfully!");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Error adding skill");
      throw error;
    }
  };

  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setSkills(skills.map(s => s.id === id ? data : s));
      toast.success("Skill updated successfully!");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Error updating skill");
      throw error;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSkills(skills.filter(s => s.id !== id));
      toast.success("Skill deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error deleting skill");
      throw error;
    }
  };

  return { skills, loading, addSkill, updateSkill, deleteSkill, refetch: fetchSkills };
}
