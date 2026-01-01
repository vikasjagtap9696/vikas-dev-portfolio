import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, UserPlus } from "lucide-react";
import { useState } from "react";
import { InviteAdminDialog } from "./InviteAdminDialog";
import { ContactSubmissionsDialog } from "./ContactSubmissionsDialog";
import { NotificationSettingsDialog } from "./NotificationSettingsDialog";
import { ProfilePhotoDialog } from "./ProfilePhotoDialog";
import { HeroBackgroundDialog } from "./HeroBackgroundDialog";
import { SocialLinksDialog } from "./SocialLinksDialog";
import { AboutImageDialog } from "./AboutImageDialog";
import { HeroTextDialog } from "./HeroTextDialog";
import { AboutTextDialog } from "./AboutTextDialog";
import { CareerGoalsDialog } from "./CareerGoalsDialog";

export function AdminToolbar() {
  const { isAdmin, signOut, user } = useAuth();
  const [showInvite, setShowInvite] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Admin Mode</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <ContactSubmissionsDialog />
          <NotificationSettingsDialog />
          <ProfilePhotoDialog />
          <HeroBackgroundDialog />
          <SocialLinksDialog />
          <AboutImageDialog />
          <HeroTextDialog />
          <AboutTextDialog />
          <CareerGoalsDialog />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInvite(true)}
            className="h-8 px-2"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="h-8 px-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <InviteAdminDialog open={showInvite} onOpenChange={setShowInvite} />
    </>
  );
}
