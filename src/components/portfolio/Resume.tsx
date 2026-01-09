import { useState } from "react";
import { useResume } from "@/hooks/useResume";
import { useAuth } from "@/contexts/AuthContext";
import { ResumeUploadDialog } from "@/components/admin/ResumeUploadDialog";

export function Resume() {
  const { resumeSettings, isLoading } = useResume();
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  const handleDownload = () => {
    if (resumeSettings?.file_url) {
      window.open(resumeSettings.file_url, "_blank");
    }
  };

  return (
    <section id="resume" className="section resume-section" style={{ position: "relative" }}>
      {/* Admin Edit Button */}
      {user && (
        <button className="section-edit-btn" onClick={() => setShowDialog(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Upload Resume
        </button>
      )}

      {/* Background gradient */}
      <div className="resume-gradient" />
      
      <div className="container relative z-10">
        <div className="resume-card glass hover-glow">
          <div className="resume-icon-wrapper">
            <svg className="resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          
          <h2 className="resume-title section-title">
            Download My <span className="gradient-text">Resume</span>
          </h2>
          
          <p className="resume-description">
            Get a comprehensive overview of my skills, experience, and qualifications 
            in a professionally formatted document.
          </p>

          <div className="flex justify-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleDownload}
              disabled={!resumeSettings?.file_url || isLoading}
              style={{ boxShadow: "var(--shadow-glow-primary)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {isLoading ? "Loading..." : resumeSettings?.file_url ? "Download Resume" : "Resume Not Available"}
            </button>
          </div>

          {resumeSettings?.file_url && resumeSettings?.file_name && (
            <p className="resume-filename">
              {resumeSettings.file_name}
            </p>
          )}
        </div>
      </div>

      {/* Dialog */}
      <ResumeUploadDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}