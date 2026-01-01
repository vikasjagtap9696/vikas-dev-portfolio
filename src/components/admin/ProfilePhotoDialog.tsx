import { useState, useRef, ReactNode } from "react";
import { Camera, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileSettings, useUpdateProfileSettings, useUploadAvatar } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

interface ProfilePhotoDialogProps {
  trigger?: ReactNode;
}

export function ProfilePhotoDialog({ trigger }: ProfilePhotoDialogProps) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();
  const uploadAvatar = useUploadAvatar();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    try {
      const publicUrl = await uploadAvatar.mutateAsync(file);
      await updateSettings.mutateAsync({ id: settings.id, avatar_url: publicUrl });
      toast.success("Profile photo updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to upload photo");
    }
  };

  const handleRemove = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({ id: settings.id, avatar_url: null });
      toast.success("Profile photo removed!");
    } catch (error) {
      toast.error("Failed to remove photo");
    }
  };

  const isLoading = uploadAvatar.isPending || updateSettings.isPending;

  const defaultTrigger = (
    <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
      <Camera className="h-4 w-4" />
      Profile Photo
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Photo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src={settings?.avatar_url || ""} alt="Profile" className="object-cover" />
            <AvatarFallback className="text-2xl">VP</AvatarFallback>
          </Avatar>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? "Uploading..." : "Upload Photo"}
            </Button>
            {settings?.avatar_url && (
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
