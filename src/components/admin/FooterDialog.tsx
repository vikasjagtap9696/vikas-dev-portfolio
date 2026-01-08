import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

interface FooterDialogProps {
  open: boolean;
  onClose: () => void;
}

export function FooterDialog({ open, onClose }: FooterDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  
  const [tagline, setTagline] = useState("");
  const [copyright, setCopyright] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (profile) {
      setTagline(profile.footer_tagline || "");
      setCopyright(profile.footer_copyright || "");
      setLocation(profile.footer_location || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile?.id) return;
    
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        footer_tagline: tagline,
        footer_copyright: copyright,
        footer_location: location,
      });
      toast.success("Footer updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update footer");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Footer">
      <div className="form-group">
        <label className="form-label">Tagline</label>
        <input
          type="text"
          className="form-input"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Your tagline"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Copyright Text</label>
        <input
          type="text"
          className="form-input"
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          placeholder="© 2024 Your Name"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country"
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
