import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

interface AboutTextDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AboutTextDialog({ open, onClose }: AboutTextDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  const [educationPrimary, setEducationPrimary] = useState("");
  const [educationSecondary, setEducationSecondary] = useState("");

  useEffect(() => {
    if (profile) {
      setIntro(profile.about_intro || "");
      setDescription(profile.about_description || "");
      setEducationPrimary(profile.about_education_primary || "");
      setEducationSecondary(profile.about_education_secondary || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile?.id) return;
    
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        about_intro: intro,
        about_description: description,
        about_education_primary: educationPrimary,
        about_education_secondary: educationSecondary,
      });
      toast.success("About text updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update about text");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit About Text" size="lg">
      <div className="form-group">
        <label className="form-label">Intro</label>
        <input
          type="text"
          className="form-input"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="Short intro"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="About description"
          rows={5}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Primary Education</label>
        <input
          type="text"
          className="form-input"
          value={educationPrimary}
          onChange={(e) => setEducationPrimary(e.target.value)}
          placeholder="e.g. Bachelor's in Computer Science"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Secondary Education</label>
        <input
          type="text"
          className="form-input"
          value={educationSecondary}
          onChange={(e) => setEducationSecondary(e.target.value)}
          placeholder="e.g. Certifications, etc."
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
