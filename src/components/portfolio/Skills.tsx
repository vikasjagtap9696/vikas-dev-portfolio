import { useState } from "react";
import { Code2, Server, Database, Wrench, Plus, Edit, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSkills, Skill } from "@/hooks/useSkills";
import { SkillDialog } from "@/components/admin/SkillDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

const categoryIcons: Record<string, any> = {
  "Frontend": Code2,
  "Backend": Server,
  "Database": Database,
  "Tools & Others": Wrench
};

const categoryColors: Record<string, string> = {
  "Frontend": "primary",
  "Backend": "accent",
  "Database": "primary",
  "Tools & Others": "accent"
};

// Fallback skills for when database is empty
const fallbackSkills = [
  { id: "1", name: "React.js", category: "Frontend", proficiency: 95, icon: null, display_order: 0 },
  { id: "2", name: "Next.js", category: "Frontend", proficiency: 85, icon: null, display_order: 1 },
  { id: "3", name: "TypeScript", category: "Frontend", proficiency: 90, icon: null, display_order: 2 },
  { id: "4", name: "Node.js", category: "Backend", proficiency: 90, icon: null, display_order: 0 },
  { id: "5", name: "Express.js", category: "Backend", proficiency: 88, icon: null, display_order: 1 },
  { id: "6", name: "MongoDB", category: "Database", proficiency: 88, icon: null, display_order: 0 },
  { id: "7", name: "PostgreSQL", category: "Database", proficiency: 82, icon: null, display_order: 1 },
  { id: "8", name: "Git/GitHub", category: "Tools & Others", proficiency: 95, icon: null, display_order: 0 },
  { id: "9", name: "Docker", category: "Tools & Others", proficiency: 75, icon: null, display_order: 1 }
];

export function Skills() {
  const { isAdmin } = useAuth();
  const { skills: dbSkills, loading, addSkill, updateSkill, deleteSkill } = useSkills();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
  const [skillToDelete, setSkillToDelete] = useState<Skill | undefined>();

  const skills = dbSkills.length > 0 ? dbSkills : fallbackSkills;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleAdd = () => {
    setSelectedSkill(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setDialogOpen(true);
  };

  const handleDeleteClick = (skill: Skill) => {
    setSkillToDelete(skill);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (skillToDelete) {
      await deleteSkill(skillToDelete.id);
      setDeleteDialogOpen(false);
      setSkillToDelete(undefined);
    }
  };

  const handleSave = async (skillData: Omit<Skill, "id">) => {
    if (selectedSkill) {
      return updateSkill(selectedSkill.id, skillData);
    }
    return addSkill(skillData);
  };

  return (
    <section id="skills" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          {isAdmin && (
            <Button onClick={handleAdd} className="mt-4" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], index) => {
            const Icon = categoryIcons[category] || Wrench;
            const color = categoryColors[category] || "primary";
            
            return (
              <div
                key={category}
                className="glass p-6 rounded-xl hover-glow transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg ${color === "primary" ? "bg-primary/20" : "bg-accent/20"}`}>
                    <Icon className={`h-6 w-6 ${color === "primary" ? "text-primary" : "text-accent"}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{category}</h3>
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="group relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                          {isAdmin && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <button
                                onClick={() => handleEdit(skill)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(skill)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <Progress 
                        value={skill.proficiency} 
                        className="h-2 bg-secondary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-16">
          <p className="text-center text-muted-foreground mb-8">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.slice(0, 10).map((skill) => (
              <div
                key={skill.id}
                className="px-4 py-2 rounded-full glass text-sm font-medium hover:scale-105 transition-transform cursor-default"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SkillDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        skill={selectedSkill}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Skill"
      />
    </section>
  );
}
