import { Code2, Server, Database, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "primary",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 98 },
      { name: "JavaScript", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "accent",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "Python", level: 75 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 70 },
      { name: "Microservices", level: 65 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "primary",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "MySQL", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Firebase", level: 75 },
      { name: "Supabase", level: 78 },
    ],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    color: "accent",
    skills: [
      { name: "Git/GitHub", level: 95 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Figma", level: 65 },
      { name: "Linux", level: 72 },
      { name: "CI/CD", level: 68 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass p-6 rounded-xl hover-glow transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.color === "primary" ? "bg-primary/20" : "bg-accent/20"}`}>
                  <category.icon className={`h-6 w-6 ${category.color === "primary" ? "text-primary" : "text-accent"}`} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-secondary"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-16">
          <p className="text-center text-muted-foreground mb-8">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git", "Tailwind", "Next.js"].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-full glass text-sm font-medium hover:scale-105 transition-transform cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}