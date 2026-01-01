import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

export function HeroStatsDialog() {
  const [open, setOpen] = useState(false);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();

  const [formData, setFormData] = useState({
    stat_years_experience: "",
    stat_projects_completed: "",
    stat_technologies: "",
    stat_client_satisfaction: "",
  });

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && settings) {
      setFormData({
        stat_years_experience: settings.stat_years_experience || "",
        stat_projects_completed: settings.stat_projects_completed || "",
        stat_technologies: settings.stat_technologies || "",
        stat_client_satisfaction: settings.stat_client_satisfaction || "",
      });
    }
    setOpen(isOpen);
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        stat_years_experience: formData.stat_years_experience || null,
        stat_projects_completed: formData.stat_projects_completed || null,
        stat_technologies: formData.stat_technologies || null,
        stat_client_satisfaction: formData.stat_client_satisfaction || null,
      });
      toast.success("Hero stats updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update stats");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Hero Stats</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="years">Years Experience</Label>
            <Input
              id="years"
              placeholder="3+"
              value={formData.stat_years_experience}
              onChange={(e) => setFormData({ ...formData, stat_years_experience: e.target.value })}
              maxLength={10}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projects">Projects Completed</Label>
            <Input
              id="projects"
              placeholder="25+"
              value={formData.stat_projects_completed}
              onChange={(e) => setFormData({ ...formData, stat_projects_completed: e.target.value })}
              maxLength={10}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies</Label>
            <Input
              id="technologies"
              placeholder="15+"
              value={formData.stat_technologies}
              onChange={(e) => setFormData({ ...formData, stat_technologies: e.target.value })}
              maxLength={10}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="satisfaction">Client Satisfaction</Label>
            <Input
              id="satisfaction"
              placeholder="100%"
              value={formData.stat_client_satisfaction}
              onChange={(e) => setFormData({ ...formData, stat_client_satisfaction: e.target.value })}
              maxLength={10}
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={updateSettings.isPending}
            className="mt-2"
          >
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
