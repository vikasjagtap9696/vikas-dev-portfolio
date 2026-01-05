/**
 * Custom hooks for Node.js Backend API
 * 
 * These hooks can be used as alternatives to the Supabase-based hooks.
 * To switch to Node.js backend, replace imports in components:
 * 
 * FROM: import { useProjects } from "@/hooks/useProjects";
 * TO:   import { useNodeProjects as useProjects } from "@/hooks/useNodeBackend";
 */

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

// Types
export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  display_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  display_order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  display_order: number;
}

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

// Projects Hook
export function useNodeProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getProjects() as Project[];
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: Omit<Project, "id">) => {
    try {
      const data = await api.createProject(project) as Project;
      setProjects([...projects, data]);
      toast({ title: "Project added successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error adding project", description: message, variant: "destructive" });
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const data = await api.updateProject(id, updates) as Project;
      setProjects(projects.map(p => p.id === id ? data : p));
      toast({ title: "Project updated successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error updating project", description: message, variant: "destructive" });
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: "Project deleted successfully!" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error deleting project", description: message, variant: "destructive" });
      throw error;
    }
  };

  return { projects, loading, addProject, updateProject, deleteProject, refetch: fetchProjects };
}

// Skills Hook
export function useNodeSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getSkills() as Skill[];
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const addSkill = async (skill: Omit<Skill, "id">) => {
    try {
      const data = await api.createSkill(skill) as Skill;
      setSkills([...skills, data]);
      toast({ title: "Skill added successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error adding skill", description: message, variant: "destructive" });
      throw error;
    }
  };

  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      const data = await api.updateSkill(id, updates) as Skill;
      setSkills(skills.map(s => s.id === id ? data : s));
      toast({ title: "Skill updated successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error updating skill", description: message, variant: "destructive" });
      throw error;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await api.deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
      toast({ title: "Skill deleted successfully!" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error deleting skill", description: message, variant: "destructive" });
      throw error;
    }
  };

  return { skills, loading, addSkill, updateSkill, deleteSkill, refetch: fetchSkills };
}

// Certificates Hook
export function useNodeCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getCertificates() as Certificate[];
      setCertificates(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const addCertificate = async (certificate: Omit<Certificate, "id">) => {
    try {
      const data = await api.createCertificate(certificate) as Certificate;
      setCertificates([...certificates, data]);
      toast({ title: "Certificate added successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error adding certificate", description: message, variant: "destructive" });
      throw error;
    }
  };

  const updateCertificate = async (id: string, updates: Partial<Certificate>) => {
    try {
      const data = await api.updateCertificate(id, updates) as Certificate;
      setCertificates(certificates.map(c => c.id === id ? data : c));
      toast({ title: "Certificate updated successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error updating certificate", description: message, variant: "destructive" });
      throw error;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await api.deleteCertificate(id);
      setCertificates(certificates.filter(c => c.id !== id));
      toast({ title: "Certificate deleted successfully!" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error deleting certificate", description: message, variant: "destructive" });
      throw error;
    }
  };

  return { certificates, loading, addCertificate, updateCertificate, deleteCertificate, refetch: fetchCertificates };
}

// Experiences Hook
export function useNodeExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getExperiences() as Experience[];
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const addExperience = async (experience: Omit<Experience, "id">) => {
    try {
      const data = await api.createExperience(experience) as Experience;
      setExperiences([...experiences, data]);
      toast({ title: "Experience added successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error adding experience", description: message, variant: "destructive" });
      throw error;
    }
  };

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    try {
      const data = await api.updateExperience(id, updates) as Experience;
      setExperiences(experiences.map(e => e.id === id ? data : e));
      toast({ title: "Experience updated successfully!" });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error updating experience", description: message, variant: "destructive" });
      throw error;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await api.deleteExperience(id);
      setExperiences(experiences.filter(e => e.id !== id));
      toast({ title: "Experience deleted successfully!" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error deleting experience", description: message, variant: "destructive" });
      throw error;
    }
  };

  return { experiences, loading, addExperience, updateExperience, deleteExperience, refetch: fetchExperiences };
}

// Profile Settings interface
export interface ProfileSettings {
  id: string;
  hero_name: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_bio: string | null;
  hero_background_url: string | null;
  avatar_url: string | null;
  about_intro: string | null;
  about_description: string | null;
  about_image_url: string | null;
  about_education_primary: string | null;
  about_education_secondary: string | null;
  career_goals: string[] | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  email: string | null;
  stat_years_experience: string | null;
  stat_projects_completed: string | null;
  stat_technologies: string | null;
  stat_client_satisfaction: string | null;
  footer_tagline: string | null;
  footer_location: string | null;
  footer_copyright: string | null;
}

// Profile Settings Hook
export function useNodeProfileSettings() {
  const [data, setData] = useState<ProfileSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await api.getProfile() as ProfileSettings;
      setData(result);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { data, isLoading, refetch: fetchProfile };
}

// Update Profile Settings Hook
export function useNodeUpdateProfileSettings() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (updates: Partial<ProfileSettings>) => {
    setIsPending(true);
    try {
      const result = await api.updateProfile(updates);
      toast({ title: "Profile updated successfully!" });
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error updating profile", description: message, variant: "destructive" });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
}

// Contact Submission interface
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Contact Submissions Hook
export function useNodeContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await api.getContactSubmissions() as ContactSubmission[];
      setSubmissions(result || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const markAsRead = async (id: string) => {
    try {
      await api.markContactAsRead(id);
      setSubmissions(submissions.map(s => s.id === id ? { ...s, is_read: true } : s));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      await api.deleteContact(id);
      setSubmissions(submissions.filter(s => s.id !== id));
      toast({ title: "Submission deleted" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  const unreadCount = submissions.filter(s => !s.is_read).length;

  return { submissions, isLoading, markAsRead, deleteSubmission, unreadCount, refetch: fetchSubmissions };
}

// Resume Settings interface
export interface ResumeSettings {
  id: string;
  file_url: string | null;
  file_name: string | null;
}

// Resume Settings Hook
export function useNodeResume() {
  const [resumeSettings, setResumeSettings] = useState<ResumeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResume = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await api.getResume() as ResumeSettings;
      setResumeSettings(result);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return { resumeSettings, isLoading, refetch: fetchResume };
}

// Auth Hook for Node.js backend
export function useNodeAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const result = await api.verifyToken();
          setIsAuthenticated(result.valid);
          setIsAdmin(result.user?.role === 'admin');
        } catch {
          api.setToken(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await api.login(email, password);
      setIsAuthenticated(true);
      setIsAdmin(result.user?.role === 'admin');
      toast({ title: "Login successful!" });
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast({ title: "Login failed", description: message, variant: "destructive" });
      throw error;
    }
  };

  const logout = async () => {
    await api.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    toast({ title: "Logged out successfully" });
  };

  return { isAuthenticated, isAdmin, loading, login, logout };
}
