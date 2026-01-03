import { useNodeAuth } from "@/contexts/NodeAuthContext";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Shield, 
  UserPlus, 
  FileText, 
  Image, 
  Settings,
  ChevronDown,
  Mail,
  Upload
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
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
import { HeroStatsDialog } from "./HeroStatsDialog";
import { FooterDialog } from "./FooterDialog";
import { ExperienceManageDialog } from "./ExperienceManageDialog";
import { SkillsManageDialog } from "./SkillsManageDialog";
import { ProjectsManageDialog } from "./ProjectsManageDialog";
import { CertificatesManageDialog } from "./CertificatesManageDialog";
import { ResumeUploadDialog } from "./ResumeUploadDialog";

export function AdminToolbar() {
  const { isAdmin, signOut } = useNodeAuth();
  const [showInvite, setShowInvite] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-20 right-2 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2 shadow-lg rounded-full px-6" size="lg">
              <Shield className="h-4 w-4" />
              Admin Mode
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 bg-background border shadow-xl z-[60]">
            {/* Contact Submissions */}
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <div className="w-full">
                <ContactSubmissionsDialog />
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* Content Sub-menu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FileText className="h-4 w-4 mr-2" />
                Content
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48 bg-background border shadow-xl z-[60]">
                  <DropdownMenuLabel>Hero Section</DropdownMenuLabel>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <HeroTextDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <HeroStatsDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>About Section</DropdownMenuLabel>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <AboutTextDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <CareerGoalsDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Manage Sections</DropdownMenuLabel>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <SkillsManageDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <ProjectsManageDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <ExperienceManageDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <CertificatesManageDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Footer</DropdownMenuLabel>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <FooterDialog />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Media Sub-menu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Image className="h-4 w-4 mr-2" />
                Media
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48 bg-background border shadow-xl z-[60]">
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <ProfilePhotoDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <HeroBackgroundDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <AboutImageDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full flex items-center gap-2 px-2 py-1.5 text-sm">
                      <Upload className="h-4 w-4" />
                      <ResumeUploadDialog />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Settings Sub-menu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48 bg-background border shadow-xl z-[60]">
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <SocialLinksDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <div className="w-full">
                      <NotificationSettingsDialog />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowInvite(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Admin
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <InviteAdminDialog open={showInvite} onOpenChange={setShowInvite} />
    </>
  );
}
