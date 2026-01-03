import { useState } from "react";
import { Award, ExternalLink, Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNodeAuth } from "@/contexts/NodeAuthContext";
import { useNodeCertificates as useCertificates, Certificate } from "@/hooks/useNodeBackend";
import { CertificateDialog } from "@/components/admin/CertificateDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { format } from "date-fns";

// Fallback certificates for when database is empty
const fallbackCertificates = [
  {
    id: "1",
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    issue_date: "2023-12-01",
    credential_url: "https://aws.amazon.com/certification/",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    display_order: 0
  },
  {
    id: "2",
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    issue_date: "2023-08-01",
    credential_url: "https://coursera.org/professional-certificates/meta-front-end-developer",
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    display_order: 1
  },
  {
    id: "3",
    title: "MongoDB Developer Certification",
    issuer: "MongoDB University",
    issue_date: "2023-05-01",
    credential_url: "https://university.mongodb.com/certification",
    image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    display_order: 2
  }
];

export function Certificates() {
  const { isAdmin } = useNodeAuth();
  const { certificates: dbCertificates, loading, addCertificate, updateCertificate, deleteCertificate } = useCertificates();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | undefined>();
  const [certificateToDelete, setCertificateToDelete] = useState<Certificate | undefined>();

  const certificates = dbCertificates.length > 0 ? dbCertificates : fallbackCertificates;

  const handleAdd = () => {
    setSelectedCertificate(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setDialogOpen(true);
  };

  const handleDeleteClick = (certificate: Certificate) => {
    setCertificateToDelete(certificate);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (certificateToDelete) {
      await deleteCertificate(certificateToDelete.id);
      setDeleteDialogOpen(false);
      setCertificateToDelete(undefined);
    }
  };

  const handleSave = async (certificateData: Omit<Certificate, "id">) => {
    if (selectedCertificate) {
      return updateCertificate(selectedCertificate.id, certificateData);
    }
    return addCertificate(certificateData);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "MMM yyyy");
    } catch {
      return dateStr;
    }
  };

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
          {isAdmin && (
            <Button onClick={handleAdd} className="mt-4" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isAdmin && (
                <div className="absolute top-2 left-2 z-10 flex gap-1">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7"
                    onClick={() => handleEdit(cert)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7"
                    onClick={() => handleDeleteClick(cert)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cert.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop"}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                </div>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-accent text-sm font-medium mb-2">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(cert.issue_date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CertificateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        certificate={selectedCertificate}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Certificate"
      />
    </section>
  );
}
