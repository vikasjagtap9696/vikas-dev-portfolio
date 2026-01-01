import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skill } from "@/hooks/useSkills";

interface SkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill;
  onSave: (skill: Omit<Skill, "id">) => Promise<any>;
}

const categories = ["Frontend", "Backend", "Database", "Tools & Others"];

export function SkillDialog({ open, onOpenChange, skill, onSave }: SkillDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 80,
    icon: "",
    display_order: 0
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        icon: skill.icon || "",
        display_order: skill.display_order
      });
    } else {
      setFormData({
        name: "",
        category: "Frontend",
        proficiency: 80,
        icon: "",
        display_order: 0
      });
    }
  }, [skill, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave({
        name: formData.name,
        category: formData.category,
        proficiency: formData.proficiency,
        icon: formData.icon || null,
        display_order: formData.display_order
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border">
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="React.js"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Proficiency: {formData.proficiency}%</Label>
            <Slider
              value={[formData.proficiency]}
              onValueChange={(value) => setFormData({ ...formData, proficiency: value[0] })}
              max={100}
              step={5}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (optional)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="Icon name or URL"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
