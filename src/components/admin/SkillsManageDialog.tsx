import { useState } from "react";
import { Modal } from "./Modal";
import { useSkills } from "@/hooks/useSkills";
import { Edit, Trash2 } from "lucide-react";

interface SkillsManageDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SkillsManageDialog({ open, onClose }: SkillsManageDialogProps) {
  const { skills, loading, addSkill, updateSkill, deleteSkill } = useSkills();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "", icon: "", proficiency: 80 });

  const resetForm = () => { setFormData({ name: "", category: "", icon: "", proficiency: 80 }); setEditingId(null); };

  const handleEdit = (skill: any) => {
    setFormData({ name: skill.name, category: skill.category, icon: skill.icon || "", proficiency: skill.proficiency || 80 });
    setEditingId(skill.id);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category) return;
    try {
      if (editingId) { await updateSkill(editingId, formData); }
      else { await addSkill({ ...formData, display_order: skills.length }); }
      resetForm();
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try { await deleteSkill(id); } catch (error) {}
  };

  return (
    <Modal open={open} onClose={onClose} title="Manage Skills" size="lg">
      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "8px" }}>
        <h4 style={{ marginBottom: "1rem" }}>{editingId ? "Edit Skill" : "Add New Skill"}</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group"><label className="form-label">Name</label><input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Category</label><input type="text" className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} /></div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button className="btn btn-primary" onClick={handleSave}>{editingId ? "Update" : "Add"}</button>
          {editingId && <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
        </div>
      </div>
      {loading ? <p>Loading...</p> : skills.map((skill) => (
        <div key={skill.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "var(--color-bg-secondary)", borderRadius: "4px", marginBottom: "0.5rem" }}>
          <span><strong>{skill.name}</strong> ({skill.category})</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-ghost" onClick={() => handleEdit(skill)}><Edit size={16} /></button>
            <button className="btn btn-ghost" onClick={() => handleDelete(skill.id)} style={{ color: "var(--color-danger)" }}><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </Modal>
  );
}