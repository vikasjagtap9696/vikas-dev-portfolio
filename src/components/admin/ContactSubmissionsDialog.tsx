import { Modal } from "./Modal";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";
import { MailOpen, Trash2 } from "lucide-react";

interface ContactSubmissionsDialogProps { open: boolean; onClose: () => void; }

export function ContactSubmissionsDialog({ open, onClose }: ContactSubmissionsDialogProps) {
  const { submissions, isLoading, markAsRead, deleteSubmission } = useContactSubmissions();

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <Modal open={open} onClose={onClose} title="Contact Submissions" size="xl">
      {isLoading ? <p>Loading...</p> : !submissions?.length ? (
        <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "2rem" }}>No submissions yet</p>
      ) : (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {submissions.map((s) => (
            <div key={s.id} style={{ padding: "1rem", marginBottom: "1rem", background: s.is_read ? "var(--color-bg-secondary)" : "var(--color-bg-tertiary)", borderRadius: "8px", borderLeft: s.is_read ? "none" : "3px solid var(--color-primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <div><strong>{s.name}</strong><span style={{ color: "var(--color-text-muted)", marginLeft: "0.5rem" }}>({s.email})</span></div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {!s.is_read && <button className="btn btn-ghost" onClick={() => markAsRead.mutate(s.id)}><MailOpen size={16} /></button>}
                  <button className="btn btn-ghost" onClick={() => { if (confirm("Delete?")) deleteSubmission.mutate(s.id); }} style={{ color: "var(--color-danger)" }}><Trash2 size={16} /></button>
                </div>
              </div>
              <p style={{ fontWeight: 500, marginBottom: "0.25rem" }}>{s.subject}</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{s.message}</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>{formatDate(s.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}