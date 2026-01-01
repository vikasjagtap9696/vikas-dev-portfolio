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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Experience } from "@/hooks/useExperiences";

interface ExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience?: Experience;
  onSave: (experience: Omit<Experience, "id">) => Promise<any>;
}

const experienceTypes = [
  { value: "job", label: "Job" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "education", label: "Education" },
];

export function ExperienceDialog({ open, onOpenChange, experience, onSave }: ExperienceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    period: "",
    description: "",
    technologies: "",
    is_current: false,
    experience_type: "job",
    display_order: 0
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title,
        company: experience.company,
        location: experience.location || "",
        period: experience.period,
        description: experience.description?.join("\n") || "",
        technologies: experience.technologies?.join(", ") || "",
        is_current: experience.is_current,
        experience_type: experience.experience_type || "job",
        display_order: experience.display_order
      });
    } else {
      setFormData({
        title: "",
        company: "",
        location: "",
        period: "",
        description: "",
        technologies: "",
        is_current: false,
        experience_type: "job",
        display_order: 0
      });
    }
  }, [experience, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave({
        title: formData.title,
        company: formData.company,
        location: formData.location || null,
        period: formData.period,
        description: formData.description.split("\n").map(s => s.trim()).filter(Boolean),
        technologies: formData.technologies.split(",").map(s => s.trim()).filter(Boolean),
        is_current: formData.is_current,
        experience_type: formData.experience_type,
        display_order: formData.display_order
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{experience ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title/Role *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Web Developer Intern"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company/Institution *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Divine Technologies"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Baramati, Maharashtra"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Duration *</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="Jan 2024 - Present"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience_type">Type</Label>
            <Select
              value={formData.experience_type}
              onValueChange={(value) => setFormData({ ...formData, experience_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {experienceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (one per line)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Developed responsive web pages&#10;Worked with React and Node.js&#10;Collaborated with team members"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="is_current">Currently Working Here</Label>
            <Switch
              id="is_current"
              checked={formData.is_current}
              onCheckedChange={(checked) => setFormData({ ...formData, is_current: checked })}
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
