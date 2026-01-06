import { useSkills, Skill } from "@/hooks/useSkills";

const categoryConfig: Record<string, { color: "primary" | "accent" }> = {
  "Frontend": { color: "primary" },
  "Backend": { color: "accent" },
  "Database": { color: "primary" },
  "Tools & Others": { color: "accent" }
};

const fallbackSkills: Skill[] = [
  { id: "1", name: "React.js", category: "Frontend", proficiency: 95, icon: null, display_order: 0 },
  { id: "2", name: "Next.js", category: "Frontend", proficiency: 85, icon: null, display_order: 1 },
  { id: "3", name: "TypeScript", category: "Frontend", proficiency: 90, icon: null, display_order: 2 },
  { id: "4", name: "Node.js", category: "Backend", proficiency: 90, icon: null, display_order: 0 },
  { id: "5", name: "Express.js", category: "Backend", proficiency: 88, icon: null, display_order: 1 },
  { id: "6", name: "MongoDB", category: "Database", proficiency: 88, icon: null, display_order: 0 },
  { id: "7", name: "PostgreSQL", category: "Database", proficiency: 82, icon: null, display_order: 1 },
  { id: "8", name: "Git/GitHub", category: "Tools & Others", proficiency: 95, icon: null, display_order: 0 },
  { id: "9", name: "Docker", category: "Tools & Others", proficiency: 75, icon: null, display_order: 1 }
];

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "Frontend":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    case "Backend":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      );
    case "Database":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      );
  }
};

export function Skills() {
  const { skills: dbSkills } = useSkills();
  const skills = dbSkills.length > 0 ? dbSkills : fallbackSkills;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="section relative">
      {/* Background decoration */}
      <div 
        className="bg-blob bg-blob-primary" 
        style={{ top: "50%", left: 0, width: "18rem", height: "18rem", transform: "translateY(-50%)" }}
      />
      <div 
        className="bg-blob bg-blob-accent" 
        style={{ top: "50%", right: 0, width: "18rem", height: "18rem", transform: "translateY(-50%)" }}
      />

      <div className="container relative z-10">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="skills-grid">
          {Object.entries(skillsByCategory).map(([category, categorySkills], index) => {
            const config = categoryConfig[category] || { color: "primary" };
            
            return (
              <div
                key={category}
                className="skill-category glass hover-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-category-header">
                  <div className={`skill-category-icon ${config.color}`}>
                    <CategoryIcon category={category} />
                  </div>
                  <h3 className="skill-category-title">{category}</h3>
                </div>

                <div className="skill-list">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percent">{skill.proficiency}%</span>
                      </div>
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Tags */}
        <div style={{ marginTop: "4rem" }}>
          <p className="text-center text-muted" style={{ marginBottom: "2rem" }}>Technologies I work with</p>
          <div className="tech-tags">
            {skills.slice(0, 10).map((skill) => (
              <div key={skill.id} className="tech-tag glass hover-scale">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
