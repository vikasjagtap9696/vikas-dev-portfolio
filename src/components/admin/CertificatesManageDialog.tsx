import { useState } from "react";
import { Award, Plus, Edit, Trash2, ExternalLink, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCertificates, type Certificate } from "@/hooks/useCertificates";
import { CertificateDialog } from "./CertificateDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function CertificatesManageDialog() {
  const { certificates, loading, addCertificate, updateCertificate, deleteCertificate } = useCertificates();
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | undefined>();

  const handleAdd = () => {
    setSelectedCertificate(undefined);
    setEditDialogOpen(true);
  };

  const handleEdit = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCertificate) {
      await deleteCertificate(selectedCertificate.id);
      setDeleteDialogOpen(false);
      setSelectedCertificate(undefined);
    }
  };

  const handleSave = async (certData: Omit<Certificate, "id">) => {
    if (selectedCertificate) {
      return updateCertificate(selectedCertificate.id, certData);
    }
    return addCertificate(certData);
  };

  return (
    <>
      <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger asChild>
          <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
            <Award className="h-4 w-4" />
            Manage Certificates
          </button>
        </DialogTrigger>
        <DialogContent className="glass border-border max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Manage Certificates</span>
              <Button onClick={handleAdd} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : certificates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No certificates added yet. Click "Add Certificate" to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        {cert.issue_date && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(cert.issue_date).toLocaleDateString()}
                          </div>
                        )}
                        {cert.credential_url && (
                          <a 
                            href={cert.credential_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Credential
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => handleEdit(cert)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => handleDeleteClick(cert)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <CertificateDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        certificate={selectedCertificate}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Certificate"
      />
    </>
  );
}
