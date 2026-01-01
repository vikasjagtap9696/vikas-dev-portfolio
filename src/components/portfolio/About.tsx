import { Code, GraduationCap, Target, Briefcase, Shield } from "lucide-react";

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
                I am Vikas Prakash Jagtap, a passionate Full Stack Web Developer and Computer Science 
                graduate with strong problem-solving skills and hands-on experience in building scalable 
                web applications. I enjoy working with modern technologies like React, Node.js, Java, SQL, 
                and PostgreSQL. My goal is to become an industry-ready all-round developer and contribute 
                to impactful software solutions.
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
                  <p className="text-muted-foreground text-sm">Baramati, Maharashtra • Graduate</p>
                </div>
                <div>
                  <p className="font-medium">Full Stack Development</p>
                  <p className="text-muted-foreground text-sm">Self-taught & Continuous Learning</p>
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
                  Become an industry-ready all-round developer
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Build products that solve real-world problems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Contribute to impactful software solutions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  Continuously improve through real-world projects
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
                  <p className="text-muted-foreground text-xs">React, Next.js, TypeScript</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-sm">Backend</p>
                  <p className="text-muted-foreground text-xs">Node.js, Java, Express</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-sm">Database</p>
                  <p className="text-muted-foreground text-xs">SQL, PostgreSQL, MongoDB</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50 flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Security</p>
                    <p className="text-muted-foreground text-xs">Cybersecurity</p>
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
