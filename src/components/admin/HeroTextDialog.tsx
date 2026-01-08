import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

interface HeroTextDialogProps {
  open: boolean;
  onClose: () => void;
}

export function HeroTextDialog({ open, onClose }: HeroTextDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.hero_name || "");
      setTitle(profile.hero_title || "");
      setSubtitle(profile.hero_subtitle || "");
      setBio(profile.hero_bio || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile?.id) return;
    
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        hero_name: name,
        hero_title: title,
        hero_subtitle: subtitle,
        hero_bio: bio,
      });
      toast.success("Hero text updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update hero text");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Hero Text">
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your Title"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Subtitle</label>
        <input
          type="text"
          className="form-input"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Your Subtitle"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Bio</label>
        <textarea
          className="form-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Short bio"
          rows={3}
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
