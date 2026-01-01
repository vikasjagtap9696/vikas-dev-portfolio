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
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

export function FooterDialog() {
  const [open, setOpen] = useState(false);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();

  const [formData, setFormData] = useState({
    footer_tagline: "",
    footer_copyright: "",
    footer_location: "",
  });

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && settings) {
      setFormData({
        footer_tagline: settings.footer_tagline || "",
        footer_copyright: settings.footer_copyright || "",
        footer_location: settings.footer_location || "",
      });
    }
    setOpen(isOpen);
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        footer_tagline: formData.footer_tagline || null,
        footer_copyright: formData.footer_copyright || null,
        footer_location: formData.footer_location || null,
      });
      toast.success("Footer content updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update footer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <FileText className="h-4 w-4 mr-2" />
          Footer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Footer Content</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline / Job Title</Label>
            <Input
              id="tagline"
              placeholder="Full Stack Web Developer"
              value={formData.footer_tagline}
              onChange={(e) => setFormData({ ...formData, footer_tagline: e.target.value })}
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="copyright">Copyright Name</Label>
            <Input
              id="copyright"
              placeholder="Vikas Prakash Jagtap"
              value={formData.footer_copyright}
              onChange={(e) => setFormData({ ...formData, footer_copyright: e.target.value })}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">Displays as "Made with ❤️ by [name]"</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Portfolio URL Label</Label>
            <Input
              id="location"
              placeholder="vikasjagtap.dev"
              value={formData.footer_location}
              onChange={(e) => setFormData({ ...formData, footer_location: e.target.value })}
              maxLength={100}
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
