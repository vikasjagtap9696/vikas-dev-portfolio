import { useState } from "react";
import { Briefcase, Plus, Edit, Trash2, GraduationCap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExperiences, type Experience } from "@/hooks/useExperiences";
import { ExperienceDialog } from "./ExperienceDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

const typeIcons: Record<string, any> = {
  job: Briefcase,
  internship: Briefcase,
  freelance: Briefcase,
  education: GraduationCap
};

const typeLabels: Record<string, string> = {
  job: "Job",
  internship: "Internship",
  freelance: "Freelance",
  education: "Education"
};

export function ExperienceManageDialog() {
  const { experiences, loading, addExperience, updateExperience, deleteExperience } = useExperiences();
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>();

  const handleAdd = () => {
    setSelectedExperience(undefined);
    setEditDialogOpen(true);
  };

  const handleEdit = (exp: Experience) => {
    setSelectedExperience(exp);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (exp: Experience) => {
    setSelectedExperience(exp);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedExperience) {
      await deleteExperience(selectedExperience.id);
      setDeleteDialogOpen(false);
      setSelectedExperience(undefined);
    }
  };

  const handleSave = async (expData: Omit<Experience, "id">) => {
    if (selectedExperience) {
      return updateExperience(selectedExperience.id, expData);
    }
    return addExperience(expData);
  };

  return (
    <>
      <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger asChild>
          <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Manage Experience
          </button>
        </DialogTrigger>
        <DialogContent className="glass border-border max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Manage Experience</span>
              <Button onClick={handleAdd} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No experiences added yet. Click "Add Experience" to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {experiences.map((exp) => {
                  const TypeIcon = typeIcons[exp.experience_type] || Briefcase;
                  return (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} • {exp.period}
                          </p>
                          <span className="text-xs text-primary">
                            {typeLabels[exp.experience_type] || exp.experience_type}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => handleEdit(exp)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDeleteClick(exp)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <ExperienceDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        experience={selectedExperience}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Experience"
      />
    </>
  );
}
