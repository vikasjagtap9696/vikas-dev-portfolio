import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "https://github.com/vikasjagtap/ecommerce",
    live: "https://ecommerce-demo.com",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team features, and analytics dashboard.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
    github: "https://github.com/vikasjagtap/taskapp",
    live: "https://taskapp-demo.com",
    featured: true,
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time chat application with AI-powered responses and sentiment analysis.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    technologies: ["React", "OpenAI", "Express", "WebSocket", "TailwindCSS"],
    github: "https://github.com/vikasjagtap/ai-chat",
    live: "https://ai-chat-demo.com",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description: "Modern developer portfolio with dark theme and smooth animations.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/vikasjagtap/portfolio",
    live: "https://vikasjagtap.dev",
    featured: false,
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather application with location-based forecasts and interactive maps.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    technologies: ["Vue.js", "OpenWeather API", "Mapbox", "Chart.js"],
    github: "https://github.com/vikasjagtap/weather",
    live: "https://weather-demo.com",
    featured: false,
  },
  {
    title: "Blog Platform",
    description:
      "Full-stack blog platform with markdown support, SEO optimization, and analytics.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    technologies: ["Next.js", "MDX", "Vercel", "PlanetScale"],
    github: "https://github.com/vikasjagtap/blog",
    live: "https://blog-demo.com",
    featured: false,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <div
                key={project.title}
                className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Other Projects */}
        <h3 className="text-xl font-semibold mb-6 text-center">Other Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <div
                key={project.title}
                className="glass p-6 rounded-xl hover-glow transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Folder className="h-10 w-10 text-primary" />
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="gradient-border" asChild>
            <a
              href="https://github.com/vikasjagtap"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View All on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
