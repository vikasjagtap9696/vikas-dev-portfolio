import { useState, useRef } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings, useUploadAvatar } from "@/hooks/useProfileSettings";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ProfilePhotoDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ProfilePhotoDialog({ open, onClose }: ProfilePhotoDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  const uploadAvatar = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!profile?.id || !selectedFile) return;
    
    try {
      const publicUrl = await uploadAvatar.mutateAsync(selectedFile);
      await updateProfile.mutateAsync({
        id: profile.id,
        avatar_url: publicUrl,
      });
      toast.success("Profile photo updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile photo");
    }
  };

  const currentImage = previewUrl || profile?.avatar_url;

  return (
    <Modal open={open} onClose={onClose} title="Update Profile Photo">
      <div style={{ textAlign: "center" }}>
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto 1rem",
            }}
          />
        ) : (
          <div style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "var(--color-bg-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}>
            <Upload size={40} style={{ color: "var(--color-text-muted)" }} />
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        
        <button 
          className="btn btn-secondary"
          onClick={() => fileInputRef.current?.click()}
          style={{ marginBottom: "1rem" }}
        >
          Choose File
        </button>
        
        {selectedFile && (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            {selectedFile.name}
          </p>
        )}
      </div>

      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button 
          className="btn btn-primary" 
          onClick={handleSave} 
          disabled={!selectedFile || uploadAvatar.isPending || updateProfile.isPending}
        >
          {uploadAvatar.isPending || updateProfile.isPending ? "Uploading..." : "Save"}
        </button>
      </div>
    </Modal>
  );
}
