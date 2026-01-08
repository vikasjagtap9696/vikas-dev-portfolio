import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

interface HeroStatsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function HeroStatsDialog({ open, onClose }: HeroStatsDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  
  const [yearsExperience, setYearsExperience] = useState("");
  const [projectsCompleted, setProjectsCompleted] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [clientSatisfaction, setClientSatisfaction] = useState("");

  useEffect(() => {
    if (profile) {
      setYearsExperience(profile.stat_years_experience || "");
      setProjectsCompleted(profile.stat_projects_completed || "");
      setTechnologies(profile.stat_technologies || "");
      setClientSatisfaction(profile.stat_client_satisfaction || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile?.id) return;
    
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        stat_years_experience: yearsExperience,
        stat_projects_completed: projectsCompleted,
        stat_technologies: technologies,
        stat_client_satisfaction: clientSatisfaction,
      });
      toast.success("Hero stats updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update hero stats");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Hero Stats">
      <div className="form-group">
        <label className="form-label">Years of Experience</label>
        <input
          type="text"
          className="form-input"
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
          placeholder="e.g. 5+"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Projects Completed</label>
        <input
          type="text"
          className="form-input"
          value={projectsCompleted}
          onChange={(e) => setProjectsCompleted(e.target.value)}
          placeholder="e.g. 50+"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Technologies</label>
        <input
          type="text"
          className="form-input"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="e.g. 20+"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Client Satisfaction</label>
        <input
          type="text"
          className="form-input"
          value={clientSatisfaction}
          onChange={(e) => setClientSatisfaction(e.target.value)}
          placeholder="e.g. 100%"
        />
      </div>
      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={updateProfile.isPending}>
          {updateProfile.isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
}
