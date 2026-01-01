import { ArrowDown, Github, Linkedin, Mail, Twitter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-accent font-medium mb-4 animate-fade-in">
              Hello, I'm
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Vikas Prakash
              </span>{" "}
              <span className="gradient-text animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Jagtap
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Full Stack Web Developer
            </h2>
            <p className="text-muted-foreground max-w-xl mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Passionate developer building scalable web applications with React, Node.js, Java, SQL, and PostgreSQL. 
              Focused on cybersecurity and continuously improving through real-world projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                onClick={() => handleScroll("#projects")}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 gradient-border"
                onClick={() => handleScroll("#contact")}
              >
                Hire Me
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => handleScroll("#resume")}
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <a
                href="https://github.com/vikasjagtap9696"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover-glow transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vikas-jagtap"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover-glow transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover-glow transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:vikasjagtap.9696@gmail.com"
                className="p-3 rounded-full glass hover-glow transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass p-6 rounded-xl text-center hover-glow transition-all duration-300">
                <div className="text-4xl font-bold gradient-text mb-2">3+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
              <div className="glass p-6 rounded-xl text-center hover-glow transition-all duration-300">
                <div className="text-4xl font-bold gradient-text mb-2">25+</div>
                <div className="text-muted-foreground text-sm">Projects Completed</div>
              </div>
              <div className="glass p-6 rounded-xl text-center hover-glow transition-all duration-300">
                <div className="text-4xl font-bold gradient-text mb-2">15+</div>
                <div className="text-muted-foreground text-sm">Technologies</div>
              </div>
              <div className="glass p-6 rounded-xl text-center hover-glow transition-all duration-300">
                <div className="text-4xl font-bold gradient-text mb-2">100%</div>
                <div className="text-muted-foreground text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={() => handleScroll("#about")}
            className="p-2 rounded-full glass hover-glow"
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
