// src/pages/privacy.js
import Head from 'next/head';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import styles from '@/styles/pages/Privacy.module.css';

export default function PrivacyPage() {
  const metaData = {
    title: 'Privacy Policy - Utlizer | Your Privacy Matters',
    description: 'Learn how Utlizer protects your privacy. We don\'t store personal data, track users, or require registration. Your data stays in your browser.',
    keywords: 'privacy policy, data protection, privacy, no tracking, browser-only tools, GDPR compliant',
    url: '/privacy'
  };

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": metaData.description,
    "url": "https://ultizer.pages.dev/privacy"
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup schema={privacySchema} />
      
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
              <h1 className={styles.pageTitle}>Privacy Policy</h1>
              <p className={styles.pageDescription}>
                Your privacy is important to us. Learn how we protect your data and respect your privacy.
              </p>
              <div className={styles.lastUpdated}>
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_HEADER} />
        </div>

        {/* Privacy Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.container}>
            <div className={styles.overviewContent}>
              <h2 className={styles.sectionTitle}>Privacy Overview</h2>
              <div className={styles.privacyHighlight}>
                <div className={styles.highlightIcon}>🔒</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>Your Data Stays in Your Browser</h3>
                  <p className={styles.highlightDescription}>
                    All our tools run entirely in your browser. We don't store, process, 
                    or transmit your data to our servers. Your information never leaves your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Privacy Policy */}
        <section className={styles.policySection}>
          <div className={styles.container}>
            <div className={styles.policyContent}>
              
              {/* Information We Don't Collect */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Information We Don't Collect</h3>
                <div className={styles.policyText}>
                  <p>We are committed to privacy by design. Here's what we <strong>don't</strong> collect:</p>
                  <ul className={styles.policyList}>
                    <li>Personal information (name, email, phone number)</li>
                    <li>Account information (no registration required)</li>
                    <li>Tool usage data or input content</li>
                    <li>IP addresses or location data</li>
                    <li>Browser fingerprints or device identifiers</li>
                    <li>Cookies for tracking purposes</li>
                    <li>Analytics data that identifies individual users</li>
                  </ul>
                </div>
              </div>

              {/* How Our Tools Work */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>How Our Tools Work</h3>
                <div className={styles.policyText}>
                  <p>All Utlizer tools operate using a client-side approach:</p>
                  <ul className={styles.policyList}>
                    <li><strong>Browser-Only Processing:</strong> All calculations and conversions happen in your browser</li>
                    <li><strong>No Server Storage:</strong> Your data is never sent to or stored on our servers</li>
                    <li><strong>No Registration:</strong> You can use all tools without creating an account</li>
                    <li><strong>No Data Transmission:</strong> Your inputs stay on your device</li>
                    <li><strong>Local Storage Only:</strong> Any saved preferences are stored locally in your browser</li>
                  </ul>
                </div>
              </div>

              {/* Third-Party Services */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Third-Party Services</h3>
                <div className={styles.policyText}>
                  <p>We use minimal third-party services to keep our tools free:</p>
                  <ul className={styles.policyList}>
                    <li><strong>Google AdSense:</strong> Displays advertisements to support our free service</li>
                    <li><strong>Cloudflare:</strong> Provides CDN services for fast tool loading</li>
                    <li><strong>GitHub:</strong> Hosts our open-source code repository</li>
                  </ul>
                  <p>
                    These services may collect data according to their own privacy policies. 
                    We do not control or have access to this data.
                  </p>
                </div>
              </div>

              {/* Cookies and Local Storage */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Cookies and Local Storage</h3>
                <div className={styles.policyText}>
                  <p>We use minimal cookies and local storage:</p>
                  <ul className={styles.policyList}>
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Ad Cookies:</strong> Used by Google AdSense for ad personalization</li>
                    <li><strong>Local Storage:</strong> Stores your tool preferences and settings locally</li>
                    <li><strong>No Tracking Cookies:</strong> We don't use cookies to track your behavior</li>
                  </ul>
                  <p>
                    You can disable cookies in your browser settings, but some features may not work properly.
                  </p>
                </div>
              </div>

              {/* Data Security */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Data Security</h3>
                <div className={styles.policyText}>
                  <p>Since we don't collect personal data, there's nothing to secure on our end. However:</p>
                  <ul className={styles.policyList}>
                    <li>All connections use HTTPS encryption</li>
                    <li>Our tools are served over secure connections</li>
                    <li>No sensitive data is transmitted to our servers</li>
                    <li>Your browser handles all data processing securely</li>
                  </ul>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Children's Privacy</h3>
                <div className={styles.policyText}>
                  <p>
                    Our tools are safe for users of all ages. Since we don't collect personal 
                    information, there are no special considerations for children's privacy. 
                    Parents can feel confident that their children can use our tools safely.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Your Rights</h3>
                <div className={styles.policyText}>
                  <p>Since we don't collect personal data, you have complete control:</p>
                  <ul className={styles.policyList}>
                    <li><strong>No Data to Access:</strong> We don't have your data to provide</li>
                    <li><strong>No Data to Delete:</strong> We don't store data to delete</li>
                    <li><strong>No Data to Correct:</strong> We don't maintain data to correct</li>
                    <li><strong>Complete Control:</strong> You control all data processing in your browser</li>
                  </ul>
                </div>
              </div>

              {/* Changes to Privacy Policy */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Changes to This Privacy Policy</h3>
                <div className={styles.policyText}>
                  <p>
                    We may update this privacy policy from time to time. Any changes will be 
                    posted on this page with an updated "Last updated" date. We encourage you 
                    to review this policy periodically.
                  </p>
                  <p>
                    If we make significant changes, we will provide notice on our website 
                    or through other appropriate means.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className={styles.policyItem}>
                <h3 className={styles.policyTitle}>Contact Us</h3>
                <div className={styles.policyText}>
                  <p>
                    If you have any questions about this privacy policy or our privacy practices, 
                    please contact us through our <a href="/contact" className={styles.contactLink}>contact page</a>.
                  </p>
                  <p>
                    We are committed to addressing any privacy concerns promptly and transparently.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_SIDEBAR} />
        </div>

        {/* Privacy Summary */}
        <section className={styles.summarySection}>
          <div className={styles.container}>
            <div className={styles.summaryContent}>
              <h2 className={styles.sectionTitle}>Privacy Summary</h2>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>🚫</div>
                  <h3 className={styles.summaryTitle}>We Don't Collect</h3>
                  <p className={styles.summaryDescription}>
                    Personal information, usage data, or any identifying information
                  </p>
                </div>
                
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>💻</div>
                  <h3 className={styles.summaryTitle}>Browser-Only</h3>
                  <p className={styles.summaryDescription}>
                    All processing happens in your browser, not on our servers
                  </p>
                </div>
                
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>🔐</div>
                  <h3 className={styles.summaryTitle}>Secure</h3>
                  <p className={styles.summaryDescription}>
                    HTTPS encryption and no data transmission to servers
                  </p>
                </div>
                
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>🆓</div>
                  <h3 className={styles.summaryTitle}>Free</h3>
                  <p className={styles.summaryDescription}>
                    No registration required, no hidden costs, no data collection
                  </p>
                </div>
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
