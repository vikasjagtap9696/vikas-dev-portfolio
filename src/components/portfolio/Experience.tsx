import { useState } from "react";
import { useExperiences, type Experience as ExperienceType } from "@/hooks/useExperiences";
import { useAuth } from "@/contexts/AuthContext";
import { ExperienceManageDialog } from "@/components/admin/ExperienceManageDialog";

const fallbackExperiences: ExperienceType[] = [
  {
    id: "1",
    title: "Web Developer Intern",
    company: "Divine Technologies",
    location: "Baramati, Maharashtra",
    period: "3 Months Internship",
    description: [
      "Developed responsive web pages and user interfaces",
      "Worked with frontend technologies including HTML, CSS, and JavaScript",
      "Gained hands-on experience in real-world web development projects",
      "Collaborated with team members on project deliverables",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    is_current: false,
    experience_type: "internship",
    display_order: 0
  },
  {
    id: "2",
    title: "BSc Computer Science",
    company: "College/University",
    location: "Baramati, Maharashtra",
    period: "Graduate",
    description: [
      "Completed Bachelor's degree in Computer Science",
      "Studied core subjects: Java, DBMS, Data Structures, Algorithms",
      "Developed multiple academic projects using various technologies",
      "Built strong foundation in programming and problem-solving",
    ],
    technologies: ["Java", "SQL", "Python", "C++"],
    is_current: false,
    experience_type: "education",
    display_order: 1
  },
];

const typeLabels: Record<string, string> = {
  job: "Job",
  internship: "Internship",
  freelance: "Freelance",
  education: "Education"
};

export function Experience() {
  const { experiences: dbExperiences } = useExperiences();
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const experiences = dbExperiences.length > 0 ? dbExperiences : fallbackExperiences;

  return (
    <section id="experience" className="section relative">
      {/* Admin Edit Button */}
      {user && (
        <button className="section-edit-btn" onClick={() => setShowDialog(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Experience
        </button>
      )}

      {/* Background decoration */}
      <div 
        className="bg-blob bg-blob-accent" 
        style={{ top: 0, right: 0, width: "24rem", height: "24rem" }}
      />

      <div className="container relative z-10">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and educational background
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="timeline-item"
            >
              {/* Timeline dot */}
              <div className="timeline-dot">
                {exp.is_current && (
                  <span className="animate-pulse" style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-primary)",
                    opacity: 0.75
                  }} />
                )}
              </div>

              {/* Content */}
              <div className="timeline-content">
                <div className="experience-card glass hover-glow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-title">{exp.title}</h3>
                      <div className="experience-company">
                        {exp.experience_type === "education" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                            <path d="M10 6h4"></path>
                            <path d="M10 10h4"></path>
                            <path d="M10 14h4"></path>
                            <path d="M10 18h4"></path>
                          </svg>
                        )}
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    {exp.is_current ? (
                      <span className="experience-badge education">Current</span>
                    ) : exp.experience_type && (
                      <span className={`experience-badge ${exp.experience_type === "education" ? "education" : "work"}`}>
                        {typeLabels[exp.experience_type] || exp.experience_type}
                      </span>
                    )}
                  </div>

                  <div className="experience-meta">
                    <div className="experience-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {exp.period}
                    </div>
                    {exp.location && (
                      <div className="experience-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {exp.location}
                      </div>
                    )}
                  </div>

                  {exp.description && exp.description.length > 0 && (
                    <ul className="experience-description about-list">
                      {exp.description.map((item, i) => (
                        <li key={i} className="about-list-item text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="experience-tech">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="experience-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Empty space for timeline alignment */}
              <div className="timeline-spacer" />
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <ExperienceManageDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}