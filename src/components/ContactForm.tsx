import { useState } from "react";
import { useSubmitContact } from "@/hooks/useProperties";

export function ContactForm() {
  const mutation = useSubmitContact();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        message: form.message,
      },
      {
        onSuccess: () =>
          setForm({ name: "", email: "", phone: "", subject: "general", message: "" }),
      }
    );
  }

  if (mutation.isSuccess) {
    return (
      <div id="form-success" className="form-success">
        <h3>Message Sent!</h3>
        <p>Thank you for contacting OzBiz Properties. Our team will respond within one business day.</p>
      </div>
    );
  }

  return (
    <form id="contact-form" className="enquiry-form" onSubmit={handleSubmit}>
      {mutation.isError && (
        <p style={{ color: "#c0392b", fontSize: "0.85rem", marginBottom: 12 }}>
          {mutation.error.message}
        </p>
      )}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
        >
          <option value="general">General Enquiry</option>
          <option value="lease">Leasing Enquiry</option>
          <option value="sale">Purchase Enquiry</option>
          <option value="list">List My Property</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}