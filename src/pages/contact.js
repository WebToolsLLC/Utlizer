// src/pages/contact.js
import { useState } from 'react';
import Head from 'next/head';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import styles from '@/styles/pages/Contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (in a real app, you'd send to your backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    }, 2000);
  };

  const metaData = {
    title: 'Contact Us - Utlizer | Get in Touch',
    description: 'Contact the Utlizer team for feedback, suggestions, bug reports, or general inquiries. We\'d love to hear from you!',
    keywords: 'contact, feedback, support, bug report, suggestions, inquiry, help',
    url: '/contact'
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Utlizer",
    "description": metaData.description,
    "url": "https://ultizer.pages.dev/contact"
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup schema={contactSchema} />
      
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Head>

      <main className={styles.main}>
        {/* Header Section */}
        <section className={styles.header}>
          <div className={styles.container}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>Contact Us</h1>
              <p className={styles.pageDescription}>
                We'd love to hear from you! Send us feedback, report bugs, or ask questions.
              </p>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_HEADER} />
        </div>

        {/* Contact Methods */}
        <section className={styles.contactMethodsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            <div className={styles.contactMethodsGrid}>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>💬</div>
                <h3 className={styles.methodTitle}>General Inquiries</h3>
                <p className={styles.methodDescription}>
                  Questions about our tools, suggestions for new features, or general feedback
                </p>
              </div>
              
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>🐛</div>
                <h3 className={styles.methodTitle}>Bug Reports</h3>
                <p className={styles.methodDescription}>
                  Found a bug? Let us know so we can fix it and improve your experience
                </p>
              </div>
              
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>💡</div>
                <h3 className={styles.methodTitle}>Feature Requests</h3>
                <p className={styles.methodDescription}>
                  Have an idea for a new tool or feature? We'd love to hear about it
                </p>
              </div>
              
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>🤝</div>
                <h3 className={styles.methodTitle}>Partnership</h3>
                <p className={styles.methodDescription}>
                  Interested in partnering with us or have a business inquiry?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className={styles.contactFormSection}>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✅</div>
                  <div className={styles.successContent}>
                    <h3 className={styles.successTitle}>Message Sent!</h3>
                    <p className={styles.successDescription}>
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={styles.formInput}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.formInput}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="type" className={styles.formLabel}>Message Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="Brief description of your message"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={styles.formTextarea}
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className={styles.buttonIcon}>📧</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_SIDEBAR} />
        </div>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How quickly do you respond?</h3>
                <p className={styles.faqAnswer}>
                  We typically respond to messages within 24-48 hours. For urgent issues, 
                  we'll do our best to get back to you sooner.
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Do you implement feature requests?</h3>
                <p className={styles.faqAnswer}>
                  Yes! We regularly review user feedback and implement popular feature requests. 
                  Your suggestions help shape our roadmap.
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Can I report bugs anonymously?</h3>
                <p className={styles.faqAnswer}>
                  Absolutely. While providing contact information helps us follow up, 
                  you can report bugs without sharing personal details.
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Do you offer technical support?</h3>
                <p className={styles.faqAnswer}>
                  We provide general support for our tools. For complex technical issues, 
                  we'll do our best to help or point you in the right direction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative Contact */}
        <section className={styles.alternativeSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Other Ways to Connect</h2>
            <div className={styles.alternativeGrid}>
              <div className={styles.alternativeCard}>
                <div className={styles.alternativeIcon}>📱</div>
                <h3 className={styles.alternativeTitle}>GitHub</h3>
                <p className={styles.alternativeDescription}>
                  View our source code, report issues, or contribute to our project
                </p>
                <a 
                  href="https://github.com/WebToolsLLC/Utlizer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.alternativeLink}
                >
                  Visit GitHub →
                </a>
              </div>
              
              <div className={styles.alternativeCard}>
                <div className={styles.alternativeIcon}>🌐</div>
                <h3 className={styles.alternativeTitle}>Website</h3>
                <p className={styles.alternativeDescription}>
                  Explore our tools and learn more about what we offer
                </p>
                <a href="/" className={styles.alternativeLink}>
                  Visit Homepage →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_FOOTER} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 86400, // Revalidate every 24 hours
  };
}
