import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

interface SocialLinksDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SocialLinksDialog({ open, onClose }: SocialLinksDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profile) {
      setGithubUrl(profile.github_url || "");
      setLinkedinUrl(profile.linkedin_url || "");
      setTwitterUrl(profile.twitter_url || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile?.id) return;
    
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        twitter_url: twitterUrl,
        email: email,
      });
      toast.success("Social links updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update social links");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Social Links">
      <div className="form-group">
        <label className="form-label">GitHub URL</label>
        <input
          type="url"
          className="form-input"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username"
        />
      </div>
      <div className="form-group">
        <label className="form-label">LinkedIn URL</label>
        <input
          type="url"
          className="form-input"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Twitter URL</label>
        <input
          type="url"
          className="form-input"
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)}
          placeholder="https://twitter.com/username"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
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
