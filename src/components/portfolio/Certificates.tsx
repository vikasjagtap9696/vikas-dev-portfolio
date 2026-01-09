import { useState } from "react";
import { useCertificates, Certificate } from "@/hooks/useCertificates";
import { useAuth } from "@/contexts/AuthContext";
import { CertificatesManageDialog } from "@/components/admin/CertificatesManageDialog";
import { format } from "date-fns";

const fallbackCertificates: Certificate[] = [
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
  const { certificates: dbCertificates } = useCertificates();
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const certificates = dbCertificates.length > 0 ? dbCertificates : fallbackCertificates;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "MMM yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="certificates" className="section relative">
      {/* Admin Edit Button */}
      {user && (
        <button className="section-edit-btn" onClick={() => setShowDialog(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Certificates
        </button>
      )}

      {/* Background decoration */}
      <div 
        className="bg-blob bg-blob-primary" 
        style={{ bottom: 0, left: 0, width: "24rem", height: "24rem" }}
      />

      <div className="container relative z-10">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">
            <span className="gradient-text">Certificates</span> & Credentials
          </h2>
          <p className="section-subtitle">
            Professional certifications validating my skills and expertise
          </p>
        </div>

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="certificate-card glass hover-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="certificate-image-container">
                <img
                  src={cert.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop"}
                  alt={cert.title}
                  className="certificate-image"
                />
                <div className="certificate-overlay" />
                <div className="certificate-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-link"
                    aria-label="View credential"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}
              </div>

              <div className="certificate-content">
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-issuer">{cert.issuer}</p>
                <div className="certificate-date">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{formatDate(cert.issue_date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <CertificatesManageDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}