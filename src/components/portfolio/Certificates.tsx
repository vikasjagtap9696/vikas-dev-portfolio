import { Award, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const certificates = [
  {
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "Dec 2023",
    credentialId: "AWS-DEV-2023-XXXXX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    link: "https://aws.amazon.com/certification/",
    skills: ["AWS", "Cloud Computing", "Lambda", "DynamoDB"],
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "Aug 2023",
    credentialId: "META-FE-2023-XXXXX",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    link: "https://coursera.org/professional-certificates/meta-front-end-developer",
    skills: ["React", "JavaScript", "UX/UI", "Testing"],
  },
  {
    title: "MongoDB Developer Certification",
    issuer: "MongoDB University",
    date: "May 2023",
    credentialId: "MONGO-DEV-XXXXX",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    link: "https://university.mongodb.com/certification",
    skills: ["MongoDB", "NoSQL", "Aggregation", "Indexing"],
  },
  {
    title: "Node.js Developer Certification",
    issuer: "OpenJS Foundation",
    date: "Feb 2023",
    credentialId: "NODEJS-2023-XXXXX",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    link: "https://openjsf.org/certification/",
    skills: ["Node.js", "Express", "APIs", "Authentication"],
  },
  {
    title: "Google IT Automation with Python",
    issuer: "Google (Coursera)",
    date: "Nov 2022",
    credentialId: "GOOGLE-PY-XXXXX",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    link: "https://coursera.org/professional-certificates/google-it-automation",
    skills: ["Python", "Automation", "Git", "Debugging"],
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Jun 2022",
    credentialId: "FCC-RWD-XXXXX",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop",
    link: "https://freecodecamp.org/certification/",
    skills: ["HTML", "CSS", "Flexbox", "Grid"],
  },
];

export function Certificates() {
  return (
    <section id="certificates" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Certificates</span> & Credentials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications validating my skills and expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.title}
              className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-accent text-sm font-medium mb-2">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-4">
                  <Calendar className="h-3 w-3" />
                  <span>{cert.date}</span>
                  <span className="text-border">•</span>
                  <span className="truncate">{cert.credentialId}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{cert.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}