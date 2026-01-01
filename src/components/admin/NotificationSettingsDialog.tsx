import { useState, useEffect } from "react";
import { Settings, Mail, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

export function NotificationSettingsDialog() {
  const { settings, isLoading, updateSettings } = useNotificationSettings();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (settings?.notification_email) {
      setEmail(settings.notification_email);
    }
  }, [settings]);

  const handleSave = () => {
    if (email.trim()) {
      updateSettings.mutate(email.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Notification Email
              </Label>
              <Input
                id="notification-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-secondary/50"
              />
              <p className="text-xs text-muted-foreground">
                Contact form submissions will be sent to this email address.
              </p>
            </div>

            <Button
              onClick={handleSave}
              disabled={updateSettings.isPending || !email.trim()}
              className="w-full"
            >
              {updateSettings.isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
