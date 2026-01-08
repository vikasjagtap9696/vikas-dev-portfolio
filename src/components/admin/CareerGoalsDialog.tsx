import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface CareerGoalsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CareerGoalsDialog({ open, onClose }: CareerGoalsDialogProps) {
  const { data: profile } = useProfileSettings();
  const updateProfile = useUpdateProfileSettings();
  
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    if (profile) {
      setGoals(profile.career_goals || []);
    }
  }, [profile]);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!profile?.id) return;
    
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        career_goals: goals,
      });
      toast.success("Career goals updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update career goals");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Career Goals">
      <div className="form-group">
        <label className="form-label">Add New Goal</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            className="form-input"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter a career goal"
            onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
          />
          <button className="btn btn-primary" onClick={handleAddGoal}>
            <Plus size={18} />
          </button>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Current Goals</label>
        {goals.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No goals added yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {goals.map((goal, index) => (
              <li key={index} style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "0.5rem",
                background: "var(--color-bg-secondary)",
                borderRadius: "4px",
                marginBottom: "0.5rem"
              }}>
                <span>{goal}</span>
                <button 
                  className="btn btn-ghost" 
                  onClick={() => handleRemoveGoal(index)}
                  style={{ color: "var(--color-danger)" }}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
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
