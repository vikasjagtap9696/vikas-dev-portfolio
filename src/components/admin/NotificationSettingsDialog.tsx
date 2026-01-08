import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

interface NotificationSettingsDialogProps { open: boolean; onClose: () => void; }

export function NotificationSettingsDialog({ open, onClose }: NotificationSettingsDialogProps) {
  const { settings, updateSettings } = useNotificationSettings();
  const [email, setEmail] = useState("");
  const [sendConfirmation, setSendConfirmation] = useState(true);

  useEffect(() => {
    if (settings) { setEmail(settings.notification_email || ""); setSendConfirmation(settings.send_confirmation_email ?? true); }
  }, [settings]);

  const handleSave = () => { updateSettings.mutate({ email, sendConfirmation }); onClose(); };

  return (
    <Modal open={open} onClose={onClose} title="Notification Settings">
      <div className="form-group"><label className="form-label">Notification Email</label><input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for notifications" /></div>
      <div className="form-group"><label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}><input type="checkbox" checked={sendConfirmation} onChange={(e) => setSendConfirmation(e.target.checked)} style={{ width: "18px", height: "18px" }} /><span>Send confirmation email to submitters</span></label></div>
      <div className="modal-actions"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={handleSave} disabled={updateSettings.isPending}>{updateSettings.isPending ? "Saving..." : "Save"}</button></div>
    </Modal>
  );
}