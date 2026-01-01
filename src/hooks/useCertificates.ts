import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  display_order: number;
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const addCertificate = async (certificate: Omit<Certificate, "id">) => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .insert(certificate)
        .select()
        .single();

      if (error) throw error;
      setCertificates([...certificates, data]);
      toast({ title: "Certificate added successfully!" });
      return data;
    } catch (error: any) {
      toast({ title: "Error adding certificate", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  const updateCertificate = async (id: string, updates: Partial<Certificate>) => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setCertificates(certificates.map(c => c.id === id ? data : c));
      toast({ title: "Certificate updated successfully!" });
      return data;
    } catch (error: any) {
      toast({ title: "Error updating certificate", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setCertificates(certificates.filter(c => c.id !== id));
      toast({ title: "Certificate deleted successfully!" });
    } catch (error: any) {
      toast({ title: "Error deleting certificate", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  return { certificates, loading, addCertificate, updateCertificate, deleteCertificate, refetch: fetchCertificates };
}
