import { useState } from "react";
import { useSubmitEnquiry } from "@/hooks/useProperties";
import type { Property } from "@/types/property";

export function EnquiryForm({ property }: { property: Property }) {
  const mutation = useSubmitEnquiry();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${property.title} at ${property.address}, ${property.suburb}.`,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(
      {
        propertyId: property.id,
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message,
      },
      { onSuccess: () => setForm({ name: "", email: "", phone: "", message: "" }) }
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="form-success">
        <h3>Enquiry Sent!</h3>
        <p>{property.agent.name} will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form id="enquiry-form" className="enquiry-form" onSubmit={handleSubmit}>
      {mutation.isError && (
        <p style={{ color: "#c0392b", fontSize: "0.85rem", marginBottom: 12 }}>
          {mutation.error.message}
        </p>
      )}
      <div className="form-group">
        <label htmlFor="name">Your Name</label>
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
        <label htmlFor="email">Email</label>
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
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="I'm interested in this property…"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}