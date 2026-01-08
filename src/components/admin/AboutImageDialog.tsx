import { useState, useRef } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings, useUploadAboutImage } from "@/hooks/useProfileSettings";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface AboutImageDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AboutImageDialog({ open, onClose }: AboutImageDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  const uploadImage = useUploadAboutImage();
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
      const publicUrl = await uploadImage.mutateAsync(selectedFile);
      await updateProfile.mutateAsync({
        id: profile.id,
        about_image_url: publicUrl,
      });
      toast.success("About image updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update about image");
    }
  };

  const currentImage = previewUrl || profile?.about_image_url;

  return (
    <Modal open={open} onClose={onClose} title="Update About Image">
      <div style={{ textAlign: "center" }}>
        {currentImage ? (
          <img
            src={currentImage}
            alt="About"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              margin: "0 auto 1rem",
            }}
          />
        ) : (
          <div style={{
            width: "200px",
            height: "200px",
            background: "var(--color-bg-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
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
          disabled={!selectedFile || uploadImage.isPending || updateProfile.isPending}
        >
          {uploadImage.isPending || updateProfile.isPending ? "Uploading..." : "Save"}
        </button>
      </div>
    </Modal>
  );
}
