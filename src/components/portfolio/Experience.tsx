import { useState } from "react";
import { Building2, Calendar, MapPin, GraduationCap, Briefcase, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useExperiences, type Experience as ExperienceType } from "@/hooks/useExperiences";
import { ExperienceDialog } from "@/components/admin/ExperienceDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

// Fallback experiences for when database is empty
const fallbackExperiences = [
  {
    id: "1",
    title: "Web Developer Intern",
    company: "Divine Technologies",
    location: "Baramati, Maharashtra",
    period: "3 Months Internship",
    description: [
      "Developed responsive web pages and user interfaces",
      "Worked with frontend technologies including HTML, CSS, and JavaScript",
      "Gained hands-on experience in real-world web development projects",
      "Collaborated with team members on project deliverables",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    is_current: false,
    experience_type: "internship",
    display_order: 0
  },
  {
    id: "2",
    title: "BSc Computer Science",
    company: "College/University",
    location: "Baramati, Maharashtra",
    period: "Graduate",
    description: [
      "Completed Bachelor's degree in Computer Science",
      "Studied core subjects: Java, DBMS, Data Structures, Algorithms",
      "Developed multiple academic projects using various technologies",
      "Built strong foundation in programming and problem-solving",
    ],
    technologies: ["Java", "SQL", "Python", "C++"],
    is_current: false,
    experience_type: "education",
    display_order: 1
  },
];

const typeIcons: Record<string, any> = {
  job: Briefcase,
  internship: Briefcase,
  freelance: Briefcase,
  education: GraduationCap
};

const typeLabels: Record<string, string> = {
  job: "Job",
  internship: "Internship",
  freelance: "Freelance",
  education: "Education"
};

export function Experience() {
  const { isAdmin } = useAuth();
  const { experiences: dbExperiences, loading, addExperience, updateExperience, deleteExperience } = useExperiences();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | undefined>();
  const [experienceToDelete, setExperienceToDelete] = useState<ExperienceType | undefined>();

  const experiences = dbExperiences.length > 0 ? dbExperiences : fallbackExperiences;

  const handleAdd = () => {
    setSelectedExperience(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (exp: ExperienceType) => {
    setSelectedExperience(exp);
    setDialogOpen(true);
  };

  const handleDeleteClick = (exp: ExperienceType) => {
    setExperienceToDelete(exp);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (experienceToDelete) {
      await deleteExperience(experienceToDelete.id);
      setDeleteDialogOpen(false);
      setExperienceToDelete(undefined);
    }
  };

  const handleSave = async (expData: Omit<ExperienceType, "id">) => {
    if (selectedExperience) {
      return updateExperience(selectedExperience.id, expData);
    }
    return addExperience(expData);
  };

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
            My professional journey and educational background
          </p>
          {isAdmin && (
            <Button onClick={handleAdd} className="mt-4" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            {experiences.map((exp, index) => {
              const TypeIcon = typeIcons[exp.experience_type] || Briefcase;
              
              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-primary z-10">
                    {exp.is_current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                    <div className="glass p-6 rounded-xl hover-glow transition-all duration-300 relative">
                      {isAdmin && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-7 w-7"
                            onClick={() => handleEdit(exp)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-7 w-7"
                            onClick={() => handleDeleteClick(exp)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-primary mt-1">
                            {exp.experience_type === "education" ? (
                              <GraduationCap className="h-4 w-4" />
                            ) : (
                              <Building2 className="h-4 w-4" />
                            )}
                            <span className="font-medium">{exp.company}</span>
                          </div>
                        </div>
                        {exp.is_current && (
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            Current
                          </span>
                        )}
                        {!exp.is_current && exp.experience_type && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exp.experience_type === "education" 
                              ? "bg-primary/20 text-primary" 
                              : "bg-accent/20 text-accent"
                          }`}>
                            {typeLabels[exp.experience_type] || exp.experience_type}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        )}
                      </div>

                      {exp.description && exp.description.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">▹</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {exp.technologies && exp.technologies.length > 0 && (
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
                      )}
                    </div>
                  </div>

                  {/* Empty space for timeline alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ExperienceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        experience={selectedExperience}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Experience"
      />
    </section>
  );
}
