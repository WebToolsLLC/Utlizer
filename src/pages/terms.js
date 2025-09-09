// src/pages/terms.js
import Head from 'next/head';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import styles from '@/styles/pages/Terms.module.css';

export default function TermsPage() {
  const metaData = {
    title: 'Terms of Service - Utlizer | Free Online Tools',
    description: 'Read our terms of service for using Utlizer\'s free online utility tools. Simple, clear terms for our browser-based tools.',
    keywords: 'terms of service, terms, conditions, free tools, online tools, usage terms',
    url: '/terms'
  };

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": metaData.description,
    "url": "https://ultizer.pages.dev/terms"
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup schema={termsSchema} />
      
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
              <h1 className={styles.pageTitle}>Terms of Service</h1>
              <p className={styles.pageDescription}>
                Simple, clear terms for using our free online utility tools.
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

        {/* Terms Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.container}>
            <div className={styles.overviewContent}>
              <h2 className={styles.sectionTitle}>Terms Overview</h2>
              <div className={styles.termsHighlight}>
                <div className={styles.highlightIcon}>📋</div>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>Simple Terms for Simple Tools</h3>
                  <p className={styles.highlightDescription}>
                    Our terms are straightforward: use our tools responsibly, respect others, 
                    and don't abuse our service. That's it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Terms */}
        <section className={styles.termsSection}>
          <div className={styles.container}>
            <div className={styles.termsContent}>
              
              {/* Acceptance of Terms */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>1. Acceptance of Terms</h3>
                <div className={styles.termsText}>
                  <p>
                    By accessing and using Utlizer ("the Service"), you accept and agree to be 
                    bound by the terms and provision of this agreement. If you do not agree to 
                    abide by the above, please do not use this service.
                  </p>
                </div>
              </div>

              {/* Use License */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>2. Use License</h3>
                <div className={styles.termsText}>
                  <p>Permission is granted to temporarily use Utlizer for personal, non-commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className={styles.termsList}>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                  <p>
                    This license shall automatically terminate if you violate any of these restrictions 
                    and may be terminated by us at any time.
                  </p>
                </div>
              </div>

              {/* Acceptable Use */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>3. Acceptable Use</h3>
                <div className={styles.termsText}>
                  <p>You agree to use our tools responsibly and not to:</p>
                  <ul className={styles.termsList}>
                    <li>Use our tools for illegal or unauthorized purposes</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our service or servers</li>
                    <li>Use our tools to harm, harass, or threaten others</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Use automated tools to abuse our service</li>
                  </ul>
                </div>
              </div>

              {/* Service Availability */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>4. Service Availability</h3>
                <div className={styles.termsText}>
                  <p>
                    We strive to keep our tools available 24/7, but we cannot guarantee 
                    uninterrupted service. We reserve the right to:
                  </p>
                  <ul className={styles.termsList}>
                    <li>Modify or discontinue any tool at any time</li>
                    <li>Perform maintenance that may temporarily affect availability</li>
                    <li>Suspend service for technical or security reasons</li>
                    <li>Update tools to improve functionality</li>
                  </ul>
                </div>
              </div>

              {/* Disclaimer */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>5. Disclaimer</h3>
                <div className={styles.termsText}>
                  <p>
                    The materials on Utlizer are provided on an 'as is' basis. Utlizer makes no 
                    warranties, expressed or implied, and hereby disclaims and negates all other 
                    warranties including without limitation, implied warranties or conditions of 
                    merchantability, fitness for a particular purpose, or non-infringement of 
                    intellectual property or other violation of rights.
                  </p>
                  <p>
                    Further, Utlizer does not warrant or make any representations concerning the 
                    accuracy, likely results, or reliability of the use of the materials on its 
                    website or otherwise relating to such materials or on any sites linked to this site.
                  </p>
                </div>
              </div>

              {/* Limitations */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>6. Limitations</h3>
                <div className={styles.termsText}>
                  <p>
                    In no event shall Utlizer or its suppliers be liable for any damages 
                    (including, without limitation, damages for loss of data or profit, or due 
                    to business interruption) arising out of the use or inability to use the 
                    materials on Utlizer, even if Utlizer or an authorized representative has 
                    been notified orally or in writing of the possibility of such damage.
                  </p>
                  <p>
                    Because some jurisdictions do not allow limitations on implied warranties, 
                    or limitations of liability for consequential or incidental damages, these 
                    limitations may not apply to you.
                  </p>
                </div>
              </div>

              {/* Accuracy of Materials */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>7. Accuracy of Materials</h3>
                <div className={styles.termsText}>
                  <p>
                    The materials appearing on Utlizer could include technical, typographical, 
                    or photographic errors. Utlizer does not warrant that any of the materials 
                    on its website are accurate, complete, or current. Utlizer may make changes 
                    to the materials contained on its website at any time without notice.
                  </p>
                  <p>
                    However, Utlizer does not make any commitment to update the materials.
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>8. Links</h3>
                <div className={styles.termsText}>
                  <p>
                    Utlizer has not reviewed all of the sites linked to our website and is not 
                    responsible for the contents of any such linked site. The inclusion of any 
                    link does not imply endorsement by Utlizer of the site. Use of any such 
                    linked website is at the user's own risk.
                  </p>
                </div>
              </div>

              {/* Modifications */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>9. Modifications</h3>
                <div className={styles.termsText}>
                  <p>
                    Utlizer may revise these terms of service for its website at any time 
                    without notice. By using this website, you are agreeing to be bound by the 
                    then current version of these terms of service.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>10. Governing Law</h3>
                <div className={styles.termsText}>
                  <p>
                    These terms and conditions are governed by and construed in accordance with 
                    the laws of the United States and you irrevocably submit to the exclusive 
                    jurisdiction of the courts in that state or location.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className={styles.termsItem}>
                <h3 className={styles.termsTitle}>11. Contact Information</h3>
                <div className={styles.termsText}>
                  <p>
                    If you have any questions about these Terms of Service, please contact us 
                    through our <a href="/contact" className={styles.contactLink}>contact page</a>.
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

        {/* Terms Summary */}
        <section className={styles.summarySection}>
          <div className={styles.container}>
            <div className={styles.summaryContent}>
              <h2 className={styles.sectionTitle}>Terms Summary</h2>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>✅</div>
                  <h3 className={styles.summaryTitle}>You Can</h3>
                  <p className={styles.summaryDescription}>
                    Use our tools for personal, non-commercial purposes
                  </p>
                </div>
                
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>❌</div>
                  <h3 className={styles.summaryTitle}>You Cannot</h3>
                  <p className={styles.summaryDescription}>
                    Use our tools for illegal purposes or abuse our service
                  </p>
                </div>
                
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>⚠️</div>
                  <h3 className={styles.summaryTitle}>We Provide</h3>
                  <p className={styles.summaryDescription}>
                    Tools "as is" without warranties or guarantees
                  </p>
                </div>
                
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>🔄</div>
                  <h3 className={styles.summaryTitle}>We Reserve</h3>
                  <p className={styles.summaryDescription}>
                    The right to modify or discontinue tools at any time
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
