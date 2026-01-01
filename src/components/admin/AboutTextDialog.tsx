import { useState } from "react";
import { FileText } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

export function AboutTextDialog() {
  const [open, setOpen] = useState(false);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();

  const [formData, setFormData] = useState({
    about_intro: "",
    about_description: "",
    about_education_primary: "",
    about_education_secondary: "",
  });

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && settings) {
      setFormData({
        about_intro: settings.about_intro || "",
        about_description: settings.about_description || "",
        about_education_primary: settings.about_education_primary || "",
        about_education_secondary: settings.about_education_secondary || "",
      });
    }
    setOpen(isOpen);
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        about_intro: formData.about_intro || null,
        about_description: formData.about_description || null,
        about_education_primary: formData.about_education_primary || null,
        about_education_secondary: formData.about_education_secondary || null,
      });
      toast.success("About section text updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update about text");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          About Text
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit About Section Text</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="about_intro">Section Intro</Label>
            <Input
              id="about_intro"
              placeholder="A passionate developer committed to creating impactful digital solutions"
              value={formData.about_intro}
              onChange={(e) => setFormData({ ...formData, about_intro: e.target.value })}
              maxLength={200}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="about_description">Who I Am - Description</Label>
            <Textarea
              id="about_description"
              placeholder="I am Vikas Prakash Jagtap, a passionate Full Stack Web Developer..."
              value={formData.about_description}
              onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
              rows={5}
              maxLength={1000}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="about_education_primary">Primary Education</Label>
            <Input
              id="about_education_primary"
              placeholder="Bachelor of Computer Science | Baramati, Maharashtra • Graduate"
              value={formData.about_education_primary}
              onChange={(e) => setFormData({ ...formData, about_education_primary: e.target.value })}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">Use | to separate title and details</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="about_education_secondary">Secondary Education</Label>
            <Input
              id="about_education_secondary"
              placeholder="Full Stack Development | Self-taught & Continuous Learning"
              value={formData.about_education_secondary}
              onChange={(e) => setFormData({ ...formData, about_education_secondary: e.target.value })}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">Use | to separate title and details</p>
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
