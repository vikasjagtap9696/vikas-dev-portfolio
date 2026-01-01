import { useState } from "react";
import { FolderKanban, Plus, Edit, Trash2, Star, ExternalLink, Github } from "lucide-react";
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
import { useProjects, type Project } from "@/hooks/useProjects";
import { ProjectDialog } from "./ProjectDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function ProjectsManageDialog() {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const handleAdd = () => {
    setSelectedProject(undefined);
    setEditDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProject) {
      await deleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
      setSelectedProject(undefined);
    }
  };

  const handleSave = async (projectData: Omit<Project, "id">) => {
    if (selectedProject) {
      return updateProject(selectedProject.id, projectData);
    }
    return addProject(projectData);
  };

  return (
    <>
      <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger asChild>
          <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
            <FolderKanban className="h-4 w-4" />
            Manage Projects
          </button>
        </DialogTrigger>
        <DialogContent className="glass border-border max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Manage Projects</span>
              <Button onClick={handleAdd} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No projects added yet. Click "Add Project" to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <FolderKanban className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground truncate">{project.title}</h4>
                          {project.featured && (
                            <Badge variant="secondary" className="gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        )}
                        {project.tech_stack && project.tech_stack.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tech_stack.slice(0, 4).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.tech_stack.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.tech_stack.length - 4}
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex gap-2 mt-2">
                          {project.github_url && (
                            <a 
                              href={project.github_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {project.live_url && (
                            <a 
                              href={project.live_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => handleDeleteClick(project)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <ProjectDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        project={selectedProject}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Project"
      />
    </>
  );
}
