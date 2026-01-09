import { useState } from "react";
import { useProfileSettings } from "@/hooks/useProfileSettings";
import { useAuth } from "@/contexts/AuthContext";
import { HeroTextDialog } from "@/components/admin/HeroTextDialog";
import { HeroStatsDialog } from "@/components/admin/HeroStatsDialog";
import { ProfilePhotoDialog } from "@/components/admin/ProfilePhotoDialog";
import { SocialLinksDialog } from "@/components/admin/SocialLinksDialog";

export function Hero() {
  const { data: profileSettings } = useProfileSettings();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const name = profileSettings?.hero_name || "Vikas Prakash Jagtap";
  const nameParts = name.split(" ");
  const lastName = nameParts.pop() || "";
  const firstName = nameParts.join(" ");

  return (
    <section id="home" className="hero">
      {/* Admin Edit Buttons */}
      {user && (
        <div style={{ position: "absolute", top: "5rem", right: "1rem", zIndex: 50, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button className="section-edit-btn" onClick={() => setOpenDialog("heroText")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Text
          </button>
          <button className="section-edit-btn" onClick={() => setOpenDialog("heroStats")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Stats
          </button>
          <button className="section-edit-btn" onClick={() => setOpenDialog("profilePhoto")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Photo
          </button>
          <button className="section-edit-btn" onClick={() => setOpenDialog("socialLinks")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Social
          </button>
        </div>
      )}

      {/* Background Image */}
      {profileSettings?.hero_background_url && (
        <div 
          className="hero-background"
          style={{ backgroundImage: `url(${profileSettings.hero_background_url})` }}
        >
          <div className="hero-overlay" />
        </div>
      )}

      {/* Background Effects */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div 
          className="bg-blob bg-blob-primary animate-float" 
          style={{ top: "25%", left: "-8rem", width: "24rem", height: "24rem" }}
        />
        <div 
          className="bg-blob bg-blob-accent animate-float" 
          style={{ bottom: "25%", right: "-8rem", width: "24rem", height: "24rem", animationDelay: "3s" }}
        />
      </div>

      <div className="container relative z-10">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-text">
            <p className="hero-greeting animate-fade-in">
              {profileSettings?.hero_title || "Hello, I'm"}
            </p>
            <h1 className="hero-name">
              <span className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                {firstName}
              </span>{" "}
              <span className="gradient-text animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {lastName}
              </span>
            </h1>
            <h2 className="hero-subtitle animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {profileSettings?.hero_subtitle || "Full Stack Web Developer"}
            </h2>
            <p className="hero-bio animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {profileSettings?.hero_bio || "Passionate developer building scalable web applications with React, Node.js, Java, SQL, and PostgreSQL. Focused on cybersecurity and continuously improving through real-world projects."}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleScroll("#projects")}
                style={{ boxShadow: "var(--shadow-glow-primary)" }}
              >
                View Projects
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => handleScroll("#contact")}
              >
                Hire Me
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() => handleScroll("#resume")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Resume
              </button>
            </div>

            {/* Social Links */}
            <div className="hero-socials animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <a
                href={profileSettings?.github_url || "https://github.com/vikasjagtap9696"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link glass hover-glow"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href={profileSettings?.linkedin_url || "https://www.linkedin.com/in/vikas-jagtap"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link glass hover-glow"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={profileSettings?.twitter_url || "https://twitter.com/yourusername"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link glass hover-glow"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href={`mailto:${profileSettings?.email || "vikasjagtap.9696@gmail.com"}`}
                className="social-link glass hover-glow"
                aria-label="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Content - Avatar & Stats */}
          <div className="hero-right animate-fade-in" style={{ animationDelay: "0.7s" }}>
            {/* Profile Photo */}
            <div className="avatar">
              {profileSettings?.avatar_url ? (
                <img src={profileSettings.avatar_url} alt="Vikas Prakash Jagtap" />
              ) : (
                <div className="avatar-fallback">VP</div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card glass hover-glow">
                <div className="stat-value gradient-text">{profileSettings?.stat_years_experience || "3+"}</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card glass hover-glow">
                <div className="stat-value gradient-text">{profileSettings?.stat_projects_completed || "25+"}</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card glass hover-glow">
                <div className="stat-value gradient-text">{profileSettings?.stat_technologies || "15+"}</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card glass hover-glow">
                <div className="stat-value gradient-text">{profileSettings?.stat_client_satisfaction || "100%"}</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator animate-bounce">
          <button
            onClick={() => handleScroll("#about")}
            className="social-link glass hover-glow"
            aria-label="Scroll to about"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Dialogs */}
      <HeroTextDialog open={openDialog === "heroText"} onClose={() => setOpenDialog(null)} />
      <HeroStatsDialog open={openDialog === "heroStats"} onClose={() => setOpenDialog(null)} />
      <ProfilePhotoDialog open={openDialog === "profilePhoto"} onClose={() => setOpenDialog(null)} />
      <SocialLinksDialog open={openDialog === "socialLinks"} onClose={() => setOpenDialog(null)} />
    </section>
  );
}