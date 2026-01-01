import { useState, useRef } from "react";
import { User, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProfileSettings, useUpdateProfileSettings, useUploadAboutImage } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

export function AboutImageDialog() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();
  const uploadImage = useUploadAboutImage();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    try {
      const publicUrl = await uploadImage.mutateAsync(file);
      await updateSettings.mutateAsync({ id: settings.id, about_image_url: publicUrl });
      toast.success("About image updated!");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleRemove = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({ id: settings.id, about_image_url: null });
      toast.success("About image removed!");
    } catch (error) {
      toast.error("Failed to remove image");
    }
  };

  const isLoading = uploadImage.isPending || updateSettings.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-2" />
          About Img
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>About Section Image</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          {settings?.about_image_url ? (
            <div className="relative rounded-lg overflow-hidden aspect-square max-w-xs mx-auto">
              <img 
                src={settings.about_image_url} 
                alt="About section preview" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center aspect-square max-w-xs mx-auto w-full rounded-lg border-2 border-dashed border-muted-foreground/25">
              <p className="text-muted-foreground text-sm">No image set</p>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? "Uploading..." : "Upload Image"}
            </Button>
            {settings?.about_image_url && (
              <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
