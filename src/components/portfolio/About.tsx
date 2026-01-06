import { useProfileSettings } from "@/hooks/useProfileSettings";

export function About() {
  const { data: profileSettings } = useProfileSettings();

  const careerGoals = profileSettings?.career_goals || [
    "Become an industry-ready all-round developer",
    "Build products that solve real-world problems",
    "Contribute to impactful software solutions",
    "Continuously improve through real-world projects",
  ];

  const parseEducation = (edu: string) => {
    const [title, details] = edu.split("|").map(s => s.trim());
    return { title, details };
  };

  const primaryEdu = parseEducation(profileSettings?.about_education_primary || "Bachelor of Computer Science | Baramati, Maharashtra • Graduate");
  const secondaryEdu = parseEducation(profileSettings?.about_education_secondary || "Full Stack Development | Self-taught & Continuous Learning");

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            {profileSettings?.about_intro || "A passionate developer committed to creating impactful digital solutions"}
          </p>
        </div>

        {/* About Image */}
        {profileSettings?.about_image_url && (
          <div className="flex justify-center" style={{ marginBottom: "3rem" }}>
            <div className="relative">
              <img 
                src={profileSettings.about_image_url} 
                alt="About me" 
                style={{
                  width: "16rem",
                  height: "16rem",
                  objectFit: "cover",
                  borderRadius: "var(--radius-2xl)",
                  boxShadow: "var(--shadow-lg)",
                  border: "4px solid rgba(139, 92, 246, 0.2)"
                }}
              />
            </div>
          </div>
        )}

        <div className="about-grid">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Who I Am */}
            <div className="about-card glass hover-glow">
              <div className="about-card-header">
                <div className="about-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 className="about-card-title">Who I Am</h3>
              </div>
              <p className="about-card-content">
                {profileSettings?.about_description || "I am Vikas Prakash Jagtap, a passionate Full Stack Web Developer and Computer Science graduate with strong problem-solving skills and hands-on experience in building scalable web applications. I enjoy working with modern technologies like React, Node.js, Java, SQL, and PostgreSQL. My goal is to become an industry-ready all-round developer and contribute to impactful software solutions."}
              </p>
            </div>

            {/* Education */}
            <div className="about-card glass hover-glow">
              <div className="about-card-header">
                <div className="about-icon" style={{ background: "rgba(6, 182, 212, 0.2)", color: "var(--color-accent)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <h3 className="about-card-title">Education</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-medium">{primaryEdu.title}</p>
                  {primaryEdu.details && <p className="text-muted text-sm">{primaryEdu.details}</p>}
                </div>
                <div>
                  <p className="font-medium">{secondaryEdu.title}</p>
                  {secondaryEdu.details && <p className="text-muted text-sm">{secondaryEdu.details}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Career Goals */}
            <div className="about-card glass hover-glow">
              <div className="about-card-header">
                <div className="about-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 className="about-card-title">Career Goals</h3>
              </div>
              <ul className="about-list">
                {careerGoals.map((goal, index) => (
                  <li key={index} className="about-list-item">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            {/* What I Do */}
            <div className="about-card glass hover-glow">
              <div className="about-card-header">
                <div className="about-icon" style={{ background: "rgba(6, 182, 212, 0.2)", color: "var(--color-accent)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h3 className="about-card-title">What I Do</h3>
              </div>
              <div className="what-i-do-grid">
                <div className="what-i-do-item">
                  <p className="what-i-do-title">Frontend</p>
                  <p className="what-i-do-tech">React, Next.js, TypeScript</p>
                </div>
                <div className="what-i-do-item">
                  <p className="what-i-do-title">Backend</p>
                  <p className="what-i-do-tech">Node.js, Java, Express</p>
                </div>
                <div className="what-i-do-item">
                  <p className="what-i-do-title">Database</p>
                  <p className="what-i-do-tech">SQL, PostgreSQL, MongoDB</p>
                </div>
                <div className="what-i-do-item" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <div>
                    <p className="what-i-do-title">Security</p>
                    <p className="what-i-do-tech">Cybersecurity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
