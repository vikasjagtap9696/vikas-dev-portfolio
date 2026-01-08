import { useState, useRef } from "react";
import { Modal } from "./Modal";
import { useResume } from "@/hooks/useResume";
import { FileText, Upload } from "lucide-react";

interface ResumeUploadDialogProps { open: boolean; onClose: () => void; }

export function ResumeUploadDialog({ open, onClose }: ResumeUploadDialogProps) {
  const { resumeSettings, uploadResume } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = async () => {
    if (!selectedFile) return;
    try { await uploadResume.mutateAsync(selectedFile); onClose(); } catch {}
  };

  return (
    <Modal open={open} onClose={onClose} title="Upload Resume">
      <div style={{ textAlign: "center" }}>
        {resumeSettings?.file_url ? (
          <div style={{ marginBottom: "1rem" }}><FileText size={48} style={{ color: "var(--color-primary)", margin: "0 auto 0.5rem" }} /><p>{resumeSettings.file_name || "Current Resume"}</p><a href={resumeSettings.file_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", fontSize: "0.875rem" }}>View Current</a></div>
        ) : <div style={{ padding: "2rem", background: "var(--color-bg-secondary)", borderRadius: "8px", marginBottom: "1rem" }}><Upload size={40} style={{ color: "var(--color-text-muted)" }} /><p style={{ color: "var(--color-text-muted)" }}>No resume uploaded</p></div>}
        <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} accept=".pdf,.doc,.docx" style={{ display: "none" }} />
        <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} style={{ marginBottom: "1rem" }}>Choose File</button>
        {selectedFile && <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Selected: {selectedFile.name}</p>}
      </div>
      <div className="modal-actions"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={handleSave} disabled={!selectedFile || uploadResume.isPending}>{uploadResume.isPending ? "Uploading..." : "Upload"}</button></div>
    </Modal>
  );
}