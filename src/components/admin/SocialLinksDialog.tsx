import { useState } from "react";
import { Share2, Github, Linkedin, Twitter, Mail } from "lucide-react";
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

export function SocialLinksDialog() {
  const [open, setOpen] = useState(false);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();

  const [formData, setFormData] = useState({
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    email: "",
  });

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && settings) {
      setFormData({
        github_url: settings.github_url || "",
        linkedin_url: settings.linkedin_url || "",
        twitter_url: settings.twitter_url || "",
        email: settings.email || "",
      });
    }
    setOpen(isOpen);
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        github_url: formData.github_url || null,
        linkedin_url: formData.linkedin_url || null,
        twitter_url: formData.twitter_url || null,
        email: formData.email || null,
      });
      toast.success("Social links updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update social links");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Social
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Social Media Links</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub URL
            </Label>
            <Input
              id="github"
              placeholder="https://github.com/username"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn URL
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter URL
            </Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/username"
              value={formData.twitter_url}
              onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
