import { useState } from "react";
import { Modal } from "./Modal";
import { useExperiences } from "@/hooks/useExperiences";
import { Edit, Trash2 } from "lucide-react";

interface ExperienceManageDialogProps { open: boolean; onClose: () => void; }

export function ExperienceManageDialog({ open, onClose }: ExperienceManageDialogProps) {
  const { experiences, loading, addExperience, updateExperience, deleteExperience } = useExperiences();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", company: "", location: "", period: "", description: "", technologies: "", experience_type: "job", is_current: false });

  const resetForm = () => { setFormData({ title: "", company: "", location: "", period: "", description: "", technologies: "", experience_type: "job", is_current: false }); setEditingId(null); };

  const handleEdit = (e: any) => { setFormData({ title: e.title, company: e.company, location: e.location || "", period: e.period, description: e.description?.join("\n") || "", technologies: e.technologies?.join(", ") || "", experience_type: e.experience_type || "job", is_current: e.is_current || false }); setEditingId(e.id); };

  const handleSave = async () => {
    if (!formData.title || !formData.company || !formData.period) return;
    const data = { title: formData.title, company: formData.company, location: formData.location, period: formData.period, description: formData.description.split("\n").filter(Boolean), technologies: formData.technologies.split(",").map(s => s.trim()).filter(Boolean), experience_type: formData.experience_type, is_current: formData.is_current, display_order: experiences.length };
    try { if (editingId) await updateExperience(editingId, data); else await addExperience(data); resetForm(); } catch {}
  };

  const handleDelete = async (id: string) => { if (confirm("Delete?")) try { await deleteExperience(id); } catch {} };

  return (
    <Modal open={open} onClose={onClose} title="Manage Experience" size="lg">
      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "8px" }}>
        <h4 style={{ marginBottom: "1rem" }}>{editingId ? "Edit" : "Add"} Experience</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group"><label className="form-label">Title</label><input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Company</label><input type="text" className="form-input" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Period</label><input type="text" className="form-input" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} placeholder="Jan 2022 - Present" /></div>
          <div className="form-group"><label className="form-label">Location</label><input type="text" className="form-input" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} /></div>
        </div>
        <div className="form-group"><label className="form-label">Description (one per line)</label><textarea className="form-input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} /></div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}><button className="btn btn-primary" onClick={handleSave}>{editingId ? "Update" : "Add"}</button>{editingId && <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>}</div>
      </div>
      {loading ? <p>Loading...</p> : experiences.map((e) => (
        <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "var(--color-bg-secondary)", borderRadius: "4px", marginBottom: "0.5rem" }}>
          <span><strong>{e.title}</strong> at {e.company}</span>
          <div style={{ display: "flex", gap: "0.5rem" }}><button className="btn btn-ghost" onClick={() => handleEdit(e)}><Edit size={16} /></button><button className="btn btn-ghost" onClick={() => handleDelete(e.id)} style={{ color: "var(--color-danger)" }}><Trash2 size={16} /></button></div>
        </div>
      ))}
    </Modal>
  );
}