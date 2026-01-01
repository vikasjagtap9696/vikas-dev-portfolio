import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    location: "Mumbai, India",
    period: "Jan 2023 - Present",
    description: [
      "Lead development of microservices architecture serving 100k+ users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
      "Integrated third-party APIs including payment gateways and analytics",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
    current: true,
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency Co.",
    location: "Pune, India",
    period: "Jun 2021 - Dec 2022",
    description: [
      "Developed 15+ client websites and web applications",
      "Built RESTful APIs and integrated with frontend applications",
      "Improved site performance scores by 40% through optimization",
      "Collaborated with design team to implement pixel-perfect UIs",
    ],
    technologies: ["React", "Express", "MongoDB", "TailwindCSS"],
    current: false,
  },
  {
    title: "Junior Web Developer",
    company: "StartUp Hub",
    location: "Bangalore, India",
    period: "Jan 2020 - May 2021",
    description: [
      "Built and maintained responsive web applications",
      "Participated in agile development processes",
      "Fixed bugs and implemented new features based on user feedback",
      "Learned best practices for clean and maintainable code",
    ],
    technologies: ["JavaScript", "React", "CSS", "Firebase"],
    current: false,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            {experiences.map((exp, index) => (
              <div
                key={exp.title + exp.company}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-primary z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                  <div className="glass p-6 rounded-xl hover-glow transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-primary mt-1">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for timeline alignment */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}