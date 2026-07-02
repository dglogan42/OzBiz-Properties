import { ContactForm } from "@/components/ContactForm";

export function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team of commercial property specialists</p>
        </div>
      </div>

      <div className="container content-page">
        <div className="two-col">
          <div className="contact-info-card">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <span>📍</span>
              <div>
                Level 12, 1 Martin Place
                <br />
                Sydney NSW 2000
              </div>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <div>
                <a href="tel:1300693249">1300 OZBIZ (693249)</a>
              </div>
            </div>
            <div className="contact-item">
              <span>✉️</span>
              <div>
                <a href="mailto:hello@ozbiz.com.au">hello@ozbiz.com.au</a>
              </div>
            </div>
            <div className="contact-item">
              <span>🕐</span>
              <div>Monday – Friday: 8:30am – 6:00pm AEST</div>
            </div>

            <h3 style={{ marginTop: 32 }}>Office Locations</h3>
            <div className="contact-item">
              <span>🏙️</span>
              <div>
                <strong>Sydney</strong> — 1 Martin Place, NSW 2000
              </div>
            </div>
            <div className="contact-item">
              <span>🏙️</span>
              <div>
                <strong>Melbourne</strong> — 100 Collins Street, VIC 3000
              </div>
            </div>
            <div className="contact-item">
              <span>🏙️</span>
              <div>
                <strong>Brisbane</strong> — 200 George Street, QLD 4000
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h3 style={{ color: "var(--navy)", marginBottom: 20 }}>Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}