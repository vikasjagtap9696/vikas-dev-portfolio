import { useState, useRef } from "react";
import { Image, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProfileSettings, useUpdateProfileSettings, useUploadHeroBackground } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

export function HeroBackgroundDialog() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();
  const uploadBackground = useUploadHeroBackground();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    try {
      const publicUrl = await uploadBackground.mutateAsync(file);
      await updateSettings.mutateAsync({ id: settings.id, hero_background_url: publicUrl });
      toast.success("Hero background updated!");
    } catch (error) {
      toast.error("Failed to upload background");
    }
  };

  const handleRemove = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({ id: settings.id, hero_background_url: null });
      toast.success("Hero background removed!");
    } catch (error) {
      toast.error("Failed to remove background");
    }
  };

  const isLoading = uploadBackground.isPending || updateSettings.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Image className="h-4 w-4 mr-2" />
          Hero BG
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Hero Background Image</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          {settings?.hero_background_url ? (
            <div className="relative rounded-lg overflow-hidden aspect-video">
              <img 
                src={settings.hero_background_url} 
                alt="Hero background preview" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25">
              <p className="text-muted-foreground text-sm">No background image set</p>
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
              {isLoading ? "Uploading..." : "Upload Background"}
            </Button>
            {settings?.hero_background_url && (
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
