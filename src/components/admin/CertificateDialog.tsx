import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Certificate } from "@/hooks/useCertificates";

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate?: Certificate;
  onSave: (certificate: Omit<Certificate, "id">) => Promise<any>;
}

export function CertificateDialog({ open, onOpenChange, certificate, onSave }: CertificateDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issue_date: "",
    credential_url: "",
    image_url: "",
    display_order: 0
  });

  useEffect(() => {
    if (certificate) {
      setFormData({
        title: certificate.title,
        issuer: certificate.issuer,
        issue_date: certificate.issue_date || "",
        credential_url: certificate.credential_url || "",
        image_url: certificate.image_url || "",
        display_order: certificate.display_order
      });
    } else {
      setFormData({
        title: "",
        issuer: "",
        issue_date: "",
        credential_url: "",
        image_url: "",
        display_order: 0
      });
    }
  }, [certificate, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave({
        title: formData.title,
        issuer: formData.issuer,
        issue_date: formData.issue_date || null,
        credential_url: formData.credential_url || null,
        image_url: formData.image_url || null,
        display_order: formData.display_order
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border">
        <DialogHeader>
          <DialogTitle>{certificate ? "Edit Certificate" : "Add Certificate"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="AWS Certified Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuer *</Label>
            <Input
              id="issuer"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="Amazon Web Services"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue_date">Issue Date</Label>
            <Input
              id="issue_date"
              type="date"
              value={formData.issue_date}
              onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credential_url">Credential URL</Label>
            <Input
              id="credential_url"
              type="url"
              value={formData.credential_url}
              onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
