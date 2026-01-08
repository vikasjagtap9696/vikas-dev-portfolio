import { useState } from "react";
import { Modal } from "./Modal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InviteAdminDialogProps {
  open: boolean;
  onClose: () => void;
}

export function InviteAdminDialog({ open, onClose }: InviteAdminDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      // First, check if user exists by email (we'll need to find the user_id)
      // Since we can't directly query auth.users, we'll check profiles table
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", email)
        .single();

      if (profileError || !profiles) {
        toast.error("User not found. They must sign up first.");
        setLoading(false);
        return;
      }

      // Add admin role
      const { error } = await supabase
        .from("user_roles")
        .insert({
          user_id: profiles.user_id,
          role: "admin",
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("User is already an admin");
        } else {
          throw error;
        }
      } else {
        toast.success("Admin role granted successfully!");
        setEmail("");
        onClose();
      }
    } catch (error) {
      console.error("Error inviting admin:", error);
      toast.error("Failed to grant admin role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Invite Admin">
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
        Enter the email address of a registered user to grant them admin access.
      </p>
      
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />
      </div>

      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleInvite} disabled={loading}>
          {loading ? "Inviting..." : "Grant Admin Access"}
        </button>
      </div>
    </Modal>
  );
}
