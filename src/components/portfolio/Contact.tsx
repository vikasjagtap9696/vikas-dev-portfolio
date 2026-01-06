import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactInfo = [
  {
    label: "Email",
    value: "vikasjagtap.9996@gmail.com",
    href: "mailto:vikasjagtap.9996@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 9145317002",
    href: "tel:+919145317002",
  },
  {
    label: "Location",
    value: "Baramati, Maharashtra, India",
    href: null,
  },
];

const socialLinks = [
  { href: "https://github.com/vikasjagtap9696", label: "GitHub" },
  { href: "https://www.linkedin.com/in/vikasjagtap9696/", label: "LinkedIn" },
  { href: "https://twitter.com/yourusername", label: "Twitter" },
  { href: "https://vikasjagtap.dev", label: "Portfolio" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ToastState = {
  show: boolean;
  title: string;
  description: string;
  variant: "default" | "destructive";
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, title: "", description: "", variant: "default" });

  const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
    setToast({ show: true, title, description, variant });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert(formData);

      if (error) throw error;

      showToast("Message sent!", "Thank you for reaching out. I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      const message = error instanceof Error ? error.message : "Please try again later.";
      showToast("Failed to send message", message, "destructive");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="section relative">
      {/* Background decoration */}
      <div 
        className="bg-blob bg-blob-primary" 
        style={{ 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          width: "37rem", 
          height: "37rem",
          opacity: 0.05
        }}
      />

      <div className="container relative z-10">
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info-section">
            <div>
              <h3 className="contact-info-title">Let's work together</h3>
              <p className="contact-info-text">
                I'm currently available for freelance work and full-time positions. 
                If you have a project that needs a skilled developer, I'd love to hear about it.
              </p>
            </div>

            <div className="contact-items">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact-item glass hover-glow">
                  <div className="contact-item-icon">
                    {item.label === "Email" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    )}
                    {item.label === "Phone" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    )}
                    {item.label === "Location" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="contact-item-label">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="contact-item-value">
                        {item.value}
                      </a>
                    ) : (
                      <p className="contact-item-value">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="contact-socials-label">Follow me on</p>
              <div className="contact-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link glass hover-glow"
                    aria-label={social.label}
                  >
                    {social.label === "GitHub" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {social.label === "LinkedIn" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {social.label === "Twitter" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                    {social.label === "Portfolio" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container glass">
            <h3 className="contact-form-title">Send me a message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input ${errors.name ? "error" : ""}`}
                    maxLength={100}
                    style={errors.name ? { borderColor: "var(--color-destructive)" } : {}}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input ${errors.email ? "error" : ""}`}
                    maxLength={255}
                    style={errors.email ? { borderColor: "var(--color-destructive)" } : {}}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
              </div>
              <div className="form-group">
                <input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`input ${errors.subject ? "error" : ""}`}
                  maxLength={200}
                  style={errors.subject ? { borderColor: "var(--color-destructive)" } : {}}
                />
                {errors.subject && <p className="form-error">{errors.subject}</p>}
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`input textarea ${errors.message ? "error" : ""}`}
                  maxLength={2000}
                  style={errors.message ? { borderColor: "var(--color-destructive)" } : {}}
                />
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={isSubmitting}
                style={{ boxShadow: "var(--shadow-glow-primary)" }}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="toast-container">
          <div className={`toast ${toast.variant === "destructive" ? "destructive" : ""}`}>
            <p className="toast-title">{toast.title}</p>
            <p className="toast-description">{toast.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
