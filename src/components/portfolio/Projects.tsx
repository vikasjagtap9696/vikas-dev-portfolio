import { useState } from "react";
import { useProjects, Project } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectsManageDialog } from "@/components/admin/ProjectsManageDialog";

const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tech_stack: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github_url: "https://github.com/vikasjagtap/ecommerce",
    live_url: "https://ecommerce-demo.com",
    featured: true,
    display_order: 0
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, team features, and analytics dashboard.",
    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    tech_stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
    github_url: "https://github.com/vikasjagtap/taskapp",
    live_url: "https://taskapp-demo.com",
    featured: true,
    display_order: 1
  },
  {
    id: "3",
    title: "AI Chat Application",
    description: "Real-time chat application with AI-powered responses and sentiment analysis.",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tech_stack: ["React", "OpenAI", "Express", "WebSocket", "TailwindCSS"],
    github_url: "https://github.com/vikasjagtap/ai-chat",
    live_url: "https://ai-chat-demo.com",
    featured: true,
    display_order: 2
  }
];

export function Projects() {
  const { projects: dbProjects } = useProjects();
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const projects = dbProjects.length > 0 ? dbProjects : fallbackProjects;

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section" style={{ position: "relative" }}>
      {/* Admin Edit Button */}
      {user && (
        <button className="section-edit-btn" onClick={() => setShowDialog(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Projects
        </button>
      )}

      <div className="container">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Featured Projects */}
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card glass hover-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-container">
                <img
                  src={project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-image-overlay" />
                <div className="project-links">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label="GitHub"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label="Live Demo"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech-stack">
                  {project.tech_stack?.slice(0, 4).map((tech) => (
                    <span key={tech} className="badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "3rem" }}>
          <a
            href="https://github.com/vikasjagtap"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "0.5rem" }}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>

      {/* Dialog */}
      <ProjectsManageDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}