'use client'

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-label fade-in--label">Contact</div>
      <div className="contact-grid">

        {/* Left */}
        <div className="contact-left fade-in--left">
          <h2 className="section-title">
            Let&apos;s build
            <br />
            <span className="contact-title-highlight">something</span>
            <br />
            extraordinary.
          </h2>
          <p className="big-text">
            Whether it&apos;s an event, a collaboration, a set, or a creative project —{' '}
            <span>I&apos;m ready to make it happen.</span>
          </p>

          <div className="contact-links">
            <a
              className="contact-link"
              href="https://wa.me/917845856809"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cl-label">WhatsApp</span>
              <span className="cl-value">+91 78458 56809</span>
              <span className="cl-arrow">→</span>
            </a>
            <a
              className="contact-link"
              href="mailto:aurasticproduction@gmail.com"
            >
              <span className="cl-label">Email</span>
              <span className="cl-value">aurasticproduction@gmail.com</span>
              <span className="cl-arrow">→</span>
            </a>
            <a
              className="contact-link"
              href="https://instagram.com/aurastic_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cl-label">Instagram</span>
              <span className="cl-value">@aurastic_official</span>
              <span className="cl-arrow">→</span>
            </a>
            <div className="contact-link">
              <span className="cl-label">Location</span>
              <span className="cl-value">Chennai, Tamil Nadu</span>
              <span className="cl-arrow">→</span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form className="contact-form fade-in--right" style={{ transitionDelay: '0.12s' }} onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" placeholder="How should I address you?" />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Email / WhatsApp</label>
            <input id="contact" type="text" placeholder="Your contact" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">What&apos;s This About?</label>
            <input
              id="subject"
              type="text"
              placeholder="Event, collaboration, DJ set, design..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tell Me More</label>
            <textarea
              id="message"
              placeholder="Brief details about your project or enquiry..."
            />
          </div>
          <button type="submit" className="btn-send">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  )
}
