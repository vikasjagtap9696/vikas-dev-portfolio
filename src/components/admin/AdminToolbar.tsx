import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Shield, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  Mail,
  FileText,
  Image,
  Settings,
  User,
  Briefcase,
  Award,
  Code,
  FolderOpen,
  Edit,
  Upload,
  Link
} from "lucide-react";

// Admin dialogs
import { HeroTextDialog } from "./HeroTextDialog";
import { HeroStatsDialog } from "./HeroStatsDialog";
import { AboutTextDialog } from "./AboutTextDialog";
import { CareerGoalsDialog } from "./CareerGoalsDialog";
import { SocialLinksDialog } from "./SocialLinksDialog";
import { FooterDialog } from "./FooterDialog";
import { ProfilePhotoDialog } from "./ProfilePhotoDialog";
import { HeroBackgroundDialog } from "./HeroBackgroundDialog";
import { AboutImageDialog } from "./AboutImageDialog";
import { ResumeUploadDialog } from "./ResumeUploadDialog";
import { NotificationSettingsDialog } from "./NotificationSettingsDialog";
import { ContactSubmissionsDialog } from "./ContactSubmissionsDialog";
import { SkillsManageDialog } from "./SkillsManageDialog";
import { ProjectsManageDialog } from "./ProjectsManageDialog";
import { ExperienceManageDialog } from "./ExperienceManageDialog";
import { CertificatesManageDialog } from "./CertificatesManageDialog";
import { InviteAdminDialog } from "./InviteAdminDialog";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";

export function AdminToolbar() {
  const { isAdmin, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { unreadCount } = useContactSubmissions();

  if (!isAdmin) return null;

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const openDialog = (dialog: string) => {
    setActiveDialog(dialog);
    setMenuOpen(false);
    setActiveSubmenu(null);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <div className="admin-toolbar" ref={menuRef}>
        {menuOpen && (
          <div className="admin-menu">
            {/* Contact Submissions */}
            <button 
              className="admin-menu-item"
              onClick={() => openDialog("contact")}
              style={{ position: "relative" }}
            >
              <Mail size={16} />
              <span>Contact Submissions</span>
              {unreadCount > 0 && (
                <span className="badge badge-destructive" style={{ marginLeft: "auto" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="admin-menu-separator" />

            {/* Content Submenu */}
            <div className="admin-submenu">
              <button 
                className="admin-menu-item"
                onClick={() => handleSubmenuToggle("content")}
              >
                <FileText size={16} />
                <span style={{ flex: 1 }}>Content</span>
                <ChevronRight size={14} />
              </button>
              {activeSubmenu === "content" && (
                <div className="admin-submenu-content">
                  <div className="admin-menu-label">Hero Section</div>
                  <button className="admin-menu-item" onClick={() => openDialog("heroText")}>
                    <Edit size={14} />
                    Hero Text
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("heroStats")}>
                    <Edit size={14} />
                    Hero Stats
                  </button>
                  
                  <div className="admin-menu-separator" />
                  <div className="admin-menu-label">About Section</div>
                  <button className="admin-menu-item" onClick={() => openDialog("aboutText")}>
                    <Edit size={14} />
                    About Text
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("careerGoals")}>
                    <Edit size={14} />
                    Career Goals
                  </button>
                  
                  <div className="admin-menu-separator" />
                  <div className="admin-menu-label">Manage Sections</div>
                  <button className="admin-menu-item" onClick={() => openDialog("skills")}>
                    <Code size={14} />
                    Skills
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("projects")}>
                    <FolderOpen size={14} />
                    Projects
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("experience")}>
                    <Briefcase size={14} />
                    Experience
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("certificates")}>
                    <Award size={14} />
                    Certificates
                  </button>

                  <div className="admin-menu-separator" />
                  <button className="admin-menu-item" onClick={() => openDialog("footer")}>
                    <Edit size={14} />
                    Footer
                  </button>
                </div>
              )}
            </div>

            {/* Media Submenu */}
            <div className="admin-submenu">
              <button 
                className="admin-menu-item"
                onClick={() => handleSubmenuToggle("media")}
              >
                <Image size={16} />
                <span style={{ flex: 1 }}>Media</span>
                <ChevronRight size={14} />
              </button>
              {activeSubmenu === "media" && (
                <div className="admin-submenu-content">
                  <button className="admin-menu-item" onClick={() => openDialog("profilePhoto")}>
                    <User size={14} />
                    Profile Photo
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("heroBackground")}>
                    <Image size={14} />
                    Hero Background
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("aboutImage")}>
                    <Image size={14} />
                    About Image
                  </button>
                  <div className="admin-menu-separator" />
                  <button className="admin-menu-item" onClick={() => openDialog("resume")}>
                    <Upload size={14} />
                    Upload Resume
                  </button>
                </div>
              )}
            </div>

            {/* Settings Submenu */}
            <div className="admin-submenu">
              <button 
                className="admin-menu-item"
                onClick={() => handleSubmenuToggle("settings")}
              >
                <Settings size={16} />
                <span style={{ flex: 1 }}>Settings</span>
                <ChevronRight size={14} />
              </button>
              {activeSubmenu === "settings" && (
                <div className="admin-submenu-content">
                  <button className="admin-menu-item" onClick={() => openDialog("socialLinks")}>
                    <Link size={14} />
                    Social Links
                  </button>
                  <button className="admin-menu-item" onClick={() => openDialog("notifications")}>
                    <Mail size={14} />
                    Notifications
                  </button>
                  <div className="admin-menu-separator" />
                  <button className="admin-menu-item" onClick={() => openDialog("inviteAdmin")}>
                    <User size={14} />
                    Invite Admin
                  </button>
                </div>
              )}
            </div>

            <div className="admin-menu-separator" />

            <button className="admin-menu-item danger" onClick={signOut}>
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        )}

        <button className="admin-btn" onClick={handleMenuToggle}>
          <Shield size={18} />
          <span>Admin</span>
          <ChevronDown size={16} style={{ transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>
      </div>

      {/* Dialogs */}
      <HeroTextDialog open={activeDialog === "heroText"} onClose={closeDialog} />
      <HeroStatsDialog open={activeDialog === "heroStats"} onClose={closeDialog} />
      <AboutTextDialog open={activeDialog === "aboutText"} onClose={closeDialog} />
      <CareerGoalsDialog open={activeDialog === "careerGoals"} onClose={closeDialog} />
      <SocialLinksDialog open={activeDialog === "socialLinks"} onClose={closeDialog} />
      <FooterDialog open={activeDialog === "footer"} onClose={closeDialog} />
      <ProfilePhotoDialog open={activeDialog === "profilePhoto"} onClose={closeDialog} />
      <HeroBackgroundDialog open={activeDialog === "heroBackground"} onClose={closeDialog} />
      <AboutImageDialog open={activeDialog === "aboutImage"} onClose={closeDialog} />
      <ResumeUploadDialog open={activeDialog === "resume"} onClose={closeDialog} />
      <NotificationSettingsDialog open={activeDialog === "notifications"} onClose={closeDialog} />
      <ContactSubmissionsDialog open={activeDialog === "contact"} onClose={closeDialog} />
      <SkillsManageDialog open={activeDialog === "skills"} onClose={closeDialog} />
      <ProjectsManageDialog open={activeDialog === "projects"} onClose={closeDialog} />
      <ExperienceManageDialog open={activeDialog === "experience"} onClose={closeDialog} />
      <CertificatesManageDialog open={activeDialog === "certificates"} onClose={closeDialog} />
      <InviteAdminDialog open={activeDialog === "inviteAdmin"} onClose={closeDialog} />
    </>
  );
}
