import { useState } from "react";
import { Type } from "lucide-react";
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

export function HeroTextDialog() {
  const [open, setOpen] = useState(false);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();

  const [formData, setFormData] = useState({
    hero_name: "",
    hero_title: "",
    hero_subtitle: "",
    hero_bio: "",
  });

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && settings) {
      setFormData({
        hero_name: settings.hero_name || "",
        hero_title: settings.hero_title || "",
        hero_subtitle: settings.hero_subtitle || "",
        hero_bio: settings.hero_bio || "",
      });
    }
    setOpen(isOpen);
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        hero_name: formData.hero_name || null,
        hero_title: formData.hero_title || null,
        hero_subtitle: formData.hero_subtitle || null,
        hero_bio: formData.hero_bio || null,
      });
      toast.success("Hero text updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update hero text");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Type className="h-4 w-4 mr-2" />
          Hero Text
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Hero Section Text</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="hero_name">Full Name</Label>
            <Input
              id="hero_name"
              placeholder="Vikas Prakash Jagtap"
              value={formData.hero_name}
              onChange={(e) => setFormData({ ...formData, hero_name: e.target.value })}
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hero_title">Greeting Text</Label>
            <Input
              id="hero_title"
              placeholder="Hello, I'm"
              value={formData.hero_title}
              onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
              maxLength={50}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Job Title / Subtitle</Label>
            <Input
              id="hero_subtitle"
              placeholder="Full Stack Web Developer"
              value={formData.hero_subtitle}
              onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hero_bio">Bio / Description</Label>
            <Textarea
              id="hero_bio"
              placeholder="Passionate developer building scalable web applications..."
              value={formData.hero_bio}
              onChange={(e) => setFormData({ ...formData, hero_bio: e.target.value })}
              rows={4}
              maxLength={500}
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
