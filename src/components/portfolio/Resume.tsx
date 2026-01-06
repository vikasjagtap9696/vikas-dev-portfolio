import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResume } from "@/hooks/useResume";
import { useAuth } from "@/contexts/AuthContext";

export function Resume() {
  const { resumeSettings, isLoading } = useResume();
  const { isAdmin } = useAuth();

  const handleDownload = () => {
    if (resumeSettings?.file_url) {
      window.open(resumeSettings.file_url, "_blank");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass p-8 md:p-12 rounded-2xl hover-glow relative">
            <div className="inline-flex p-4 rounded-full bg-primary/20 mb-6">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Download My <span className="gradient-text">Resume</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get a comprehensive overview of my skills, experience, and qualifications 
              in a professionally formatted document.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                onClick={handleDownload}
                disabled={!resumeSettings?.file_url || isLoading}
              >
                <Download className="mr-2 h-5 w-5" />
                {isLoading ? "Loading..." : resumeSettings?.file_url ? "Download Resume" : "Resume Not Available"}
              </Button>
            </div>

            {resumeSettings?.file_url && resumeSettings?.file_name && (
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {resumeSettings.file_name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
