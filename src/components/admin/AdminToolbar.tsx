import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Shield, 
  UserPlus, 
  FileText, 
  Image, 
  Settings,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

export function AdminToolbar() {
  const { isAdmin, signOut } = useAuth();
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
          
          {/* Contact Submissions - standalone as frequently used */}
          <ContactSubmissionsDialog />
          
          {/* Content Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Content
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg z-50">
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
              <DropdownMenuLabel>Footer</DropdownMenuLabel>
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <div className="w-full">
                  <FooterDialog />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Media Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Image className="h-4 w-4" />
                Media
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg z-50">
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
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Settings
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg z-50">
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
            </DropdownMenuContent>
          </DropdownMenu>

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
