import { useState } from "react";
import { Modal } from "./Modal";
import { useCertificates } from "@/hooks/useCertificates";
import { Edit, Trash2 } from "lucide-react";

interface CertificatesManageDialogProps { open: boolean; onClose: () => void; }

export function CertificatesManageDialog({ open, onClose }: CertificatesManageDialogProps) {
  const { certificates, loading, addCertificate, updateCertificate, deleteCertificate } = useCertificates();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", issuer: "", issue_date: "", credential_url: "", image_url: "" });

  const resetForm = () => { setFormData({ title: "", issuer: "", issue_date: "", credential_url: "", image_url: "" }); setEditingId(null); };

  const handleEdit = (c: any) => { setFormData({ title: c.title, issuer: c.issuer, issue_date: c.issue_date || "", credential_url: c.credential_url || "", image_url: c.image_url || "" }); setEditingId(c.id); };

  const handleSave = async () => {
    if (!formData.title || !formData.issuer) return;
    try { if (editingId) await updateCertificate(editingId, formData); else await addCertificate({ ...formData, display_order: certificates.length }); resetForm(); } catch {}
  };

  const handleDelete = async (id: string) => { if (confirm("Delete?")) try { await deleteCertificate(id); } catch {} };

  return (
    <Modal open={open} onClose={onClose} title="Manage Certificates" size="lg">
      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "8px" }}>
        <h4 style={{ marginBottom: "1rem" }}>{editingId ? "Edit" : "Add"} Certificate</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group"><label className="form-label">Title</label><input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Issuer</label><input type="text" className="form-input" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Issue Date</label><input type="date" className="form-input" value={formData.issue_date} onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Credential URL</label><input type="url" className="form-input" value={formData.credential_url} onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })} /></div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}><button className="btn btn-primary" onClick={handleSave}>{editingId ? "Update" : "Add"}</button>{editingId && <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>}</div>
      </div>
      {loading ? <p>Loading...</p> : certificates.map((c) => (
        <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "var(--color-bg-secondary)", borderRadius: "4px", marginBottom: "0.5rem" }}>
          <span><strong>{c.title}</strong> by {c.issuer}</span>
          <div style={{ display: "flex", gap: "0.5rem" }}><button className="btn btn-ghost" onClick={() => handleEdit(c)}><Edit size={16} /></button><button className="btn btn-ghost" onClick={() => handleDelete(c.id)} style={{ color: "var(--color-danger)" }}><Trash2 size={16} /></button></div>
        </div>
      ))}
    </Modal>
  );
}