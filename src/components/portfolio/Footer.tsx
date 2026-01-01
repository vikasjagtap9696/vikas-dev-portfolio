import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold gradient-text">
              VJ
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Full Stack Web Developer
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span>by Vikas Jagtap</span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass hover-glow transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}