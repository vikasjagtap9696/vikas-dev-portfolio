import { useState } from "react";
import { Wrench, Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useSkills, type Skill } from "@/hooks/useSkills";
import { SkillDialog } from "./SkillDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function SkillsManageDialog() {
  const { skills, loading, addSkill, updateSkill, deleteSkill } = useSkills();
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();

  const handleAdd = () => {
    setSelectedSkill(undefined);
    setEditDialogOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSkill) {
      await deleteSkill(selectedSkill.id);
      setDeleteDialogOpen(false);
      setSelectedSkill(undefined);
    }
  };

  const handleSave = async (skillData: Omit<Skill, "id">) => {
    if (selectedSkill) {
      return updateSkill(selectedSkill.id, skillData);
    }
    return addSkill(skillData);
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <>
      <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger asChild>
          <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Manage Skills
          </button>
        </DialogTrigger>
        <DialogContent className="glass border-border max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Manage Skills</span>
              <Button onClick={handleAdd} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : skills.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No skills added yet. Click "Add Skill" to get started.
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">{category}</h3>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Wrench className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{skill.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${skill.proficiency}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8"
                              onClick={() => handleEdit(skill)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8"
                              onClick={() => handleDeleteClick(skill)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <SkillDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        skill={selectedSkill}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Skill"
      />
    </>
  );
}
