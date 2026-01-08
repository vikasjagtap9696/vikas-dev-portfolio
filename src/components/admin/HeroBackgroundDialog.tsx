import { useState, useRef } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings, useUploadHeroBackground } from "@/hooks/useProfileSettings";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface HeroBackgroundDialogProps {
  open: boolean;
  onClose: () => void;
}

export function HeroBackgroundDialog({ open, onClose }: HeroBackgroundDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  const uploadBackground = useUploadHeroBackground();
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
      const publicUrl = await uploadBackground.mutateAsync(selectedFile);
      await updateProfile.mutateAsync({
        id: profile.id,
        hero_background_url: publicUrl,
      });
      toast.success("Hero background updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update hero background");
    }
  };

  const currentImage = previewUrl || profile?.hero_background_url;

  return (
    <Modal open={open} onClose={onClose} title="Update Hero Background" size="lg">
      <div style={{ textAlign: "center" }}>
        {currentImage ? (
          <img
            src={currentImage}
            alt="Hero Background"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "200px",
            background: "var(--color-bg-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            marginBottom: "1rem",
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
          disabled={!selectedFile || uploadBackground.isPending || updateProfile.isPending}
        >
          {uploadBackground.isPending || updateProfile.isPending ? "Uploading..." : "Save"}
        </button>
      </div>
    </Modal>
  );
}
