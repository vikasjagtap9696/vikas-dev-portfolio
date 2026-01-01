import { Code, GraduationCap, Target, Briefcase } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate developer committed to creating impactful digital solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Info */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl hover-glow transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <Code className="h-5 w-5 text-primary" />
                Who I Am
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm Vikas Jagtap, a Full Stack Web Developer with expertise in building 
                modern, responsive, and scalable web applications. I specialize in React, 
                Node.js, and cloud technologies, with a strong focus on clean code and 
                best practices.
              </p>
            </div>

            <div className="glass p-6 rounded-xl hover-glow transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-accent" />
                Education
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Bachelor of Computer Science</p>
                  <p className="text-muted-foreground text-sm">University of Technology • 2018-2022</p>
                </div>
                <div>
                  <p className="font-medium">Full Stack Development Certification</p>
                  <p className="text-muted-foreground text-sm">Tech Institute • 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Goals & What I Do */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl hover-glow transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                Career Goals
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Lead innovative web development projects at scale
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Contribute to open-source communities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Build products that solve real-world problems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Mentor aspiring developers
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl hover-glow transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-accent" />
                What I Do
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-sm">Frontend</p>
                  <p className="text-muted-foreground text-xs">React, Next.js, Vue</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-sm">Backend</p>
                  <p className="text-muted-foreground text-xs">Node.js, Express, Python</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-sm">Database</p>
                  <p className="text-muted-foreground text-xs">MongoDB, PostgreSQL</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-sm">Cloud</p>
                  <p className="text-muted-foreground text-xs">AWS, Docker, CI/CD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}