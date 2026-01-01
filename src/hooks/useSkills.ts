import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
      toast({ title: "Skill added successfully!" });
      return data;
    } catch (error: any) {
      toast({ title: "Error adding skill", description: error.message, variant: "destructive" });
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
      toast({ title: "Skill updated successfully!" });
      return data;
    } catch (error: any) {
      toast({ title: "Error updating skill", description: error.message, variant: "destructive" });
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
      toast({ title: "Skill deleted successfully!" });
    } catch (error: any) {
      toast({ title: "Error deleting skill", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  return { skills, loading, addSkill, updateSkill, deleteSkill, refetch: fetchSkills };
}
