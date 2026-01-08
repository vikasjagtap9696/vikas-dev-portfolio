import { useState } from "react";
import { Modal } from "./Modal";
import { useProjects } from "@/hooks/useProjects";
import { Edit, Trash2 } from "lucide-react";

interface ProjectsManageDialogProps { open: boolean; onClose: () => void; }

export function ProjectsManageDialog({ open, onClose }: ProjectsManageDialogProps) {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", image_url: "", github_url: "", live_url: "", tech_stack: "", featured: false });

  const resetForm = () => { setFormData({ title: "", description: "", image_url: "", github_url: "", live_url: "", tech_stack: "", featured: false }); setEditingId(null); };

  const handleEdit = (p: any) => { setFormData({ title: p.title, description: p.description || "", image_url: p.image_url || "", github_url: p.github_url || "", live_url: p.live_url || "", tech_stack: p.tech_stack?.join(", ") || "", featured: p.featured || false }); setEditingId(p.id); };

  const handleSave = async () => {
    if (!formData.title) return;
    const data = { title: formData.title, description: formData.description, image_url: formData.image_url, github_url: formData.github_url, live_url: formData.live_url, tech_stack: formData.tech_stack.split(",").map(s => s.trim()).filter(Boolean), featured: formData.featured, display_order: projects.length };
    try { if (editingId) await updateProject(editingId, data); else await addProject(data); resetForm(); } catch {}
  };

  const handleDelete = async (id: string) => { if (confirm("Delete?")) try { await deleteProject(id); } catch {} };

  return (
    <Modal open={open} onClose={onClose} title="Manage Projects" size="lg">
      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "8px" }}>
        <h4 style={{ marginBottom: "1rem" }}>{editingId ? "Edit" : "Add"} Project</h4>
        <div className="form-group"><label className="form-label">Title</label><input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
        <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} /></div>
        <div className="form-group"><label className="form-label">Tech Stack (comma-separated)</label><input type="text" className="form-input" value={formData.tech_stack} onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })} /></div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}><button className="btn btn-primary" onClick={handleSave}>{editingId ? "Update" : "Add"}</button>{editingId && <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>}</div>
      </div>
      {loading ? <p>Loading...</p> : projects.map((p) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "var(--color-bg-secondary)", borderRadius: "4px", marginBottom: "0.5rem" }}>
          <strong>{p.title}</strong>
          <div style={{ display: "flex", gap: "0.5rem" }}><button className="btn btn-ghost" onClick={() => handleEdit(p)}><Edit size={16} /></button><button className="btn btn-ghost" onClick={() => handleDelete(p.id)} style={{ color: "var(--color-danger)" }}><Trash2 size={16} /></button></div>
        </div>
      ))}
    </Modal>
  );
}