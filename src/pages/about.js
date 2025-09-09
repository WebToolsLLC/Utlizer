// src/pages/about.js
import Head from 'next/head';
import Link from 'next/link';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import styles from '@/styles/pages/About.module.css';

export default function AboutPage() {
  const metaData = {
    title: 'About Utlizer - Free Online Utility Tools for Everyone',
    description: 'Learn about Utlizer, our mission to provide free, accessible utility tools for productivity, conversion, design, and daily tasks. No registration required.',
    keywords: 'about utlizer, free tools, utility tools, online tools, productivity tools, mission, vision',
    url: '/about'
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Utlizer",
    "description": metaData.description,
    "url": "https://ultizer.pages.dev/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Utlizer",
      "description": "Free online utility tools for productivity and daily tasks",
      "url": "https://ultizer.pages.dev",
      "sameAs": [
        "https://github.com/WebToolsLLC/Utlizer"
      ]
    }
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup schema={aboutSchema} />
      
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>About Utlizer</h1>
              <p className={styles.heroDescription}>
                Empowering users with free, accessible utility tools for productivity and daily tasks
              </p>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_HEADER} />
        </div>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.container}>
            <div className={styles.missionContent}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                At Utlizer, we believe that powerful utility tools should be accessible to everyone, 
                everywhere, without barriers. Our mission is to provide a comprehensive collection 
                of free, high-quality online tools that help users accomplish their daily tasks more 
                efficiently and effectively.
              </p>
              <p className={styles.missionText}>
                We're committed to maintaining the highest standards of privacy, security, and 
                user experience while keeping all our tools completely free and accessible 
                without any registration requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🆓</div>
                <h3 className={styles.valueTitle}>Always Free</h3>
                <p className={styles.valueDescription}>
                  All our tools are completely free to use. No hidden costs, no premium tiers, 
                  no subscriptions. We believe in providing value without barriers.
                </p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🔒</div>
                <h3 className={styles.valueTitle}>Privacy First</h3>
                <p className={styles.valueDescription}>
                  Your data stays in your browser. We don't store, track, or share your 
                  personal information or tool usage data.
                </p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>⚡</div>
                <h3 className={styles.valueTitle}>Lightning Fast</h3>
                <p className={styles.valueDescription}>
                  All our tools are optimized for speed and performance. Get instant results 
                  without waiting for page loads or server processing.
                </p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🌍</div>
                <h3 className={styles.valueTitle}>Accessible Everywhere</h3>
                <p className={styles.valueDescription}>
                  Works on any device, any browser, anywhere in the world. No downloads, 
                  no installations, no compatibility issues.
                </p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🎯</div>
                <h3 className={styles.valueTitle}>User-Focused</h3>
                <p className={styles.valueDescription}>
                  Every tool is designed with the user in mind. Simple interfaces, clear 
                  instructions, and intuitive functionality.
                </p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🔄</div>
                <h3 className={styles.valueTitle}>Continuously Improving</h3>
                <p className={styles.valueDescription}>
                  We regularly update and improve our tools based on user feedback and 
                  emerging needs. Your input shapes our development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_SIDEBAR} />
        </div>

        {/* Story Section */}
        <section className={styles.storySection}>
          <div className={styles.container}>
            <div className={styles.storyContent}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <div className={styles.storyText}>
                <p>
                  Utlizer was born from a simple observation: people need quick, reliable tools 
                  for everyday tasks, but many existing solutions are either too complex, too 
                  expensive, or too invasive with user data.
                </p>
                <p>
                  We started with a vision to create a platform where anyone could access 
                  powerful utility tools without barriers. Whether you're a student needing 
                  a word counter for an essay, a developer requiring a color converter, 
                  or a professional looking for a password generator, we wanted to provide 
                  the solution.
                </p>
                <p>
                  Today, Utlizer offers 50+ carefully crafted tools across 7 categories, 
                  serving thousands of users worldwide. Our commitment remains the same: 
                  provide free, fast, and reliable tools that make your life easier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>By the Numbers</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Free Tools</div>
                <div className={styles.statDescription}>Available across 7 categories</div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statNumber}>7</div>
                <div className={styles.statLabel}>Categories</div>
                <div className={styles.statDescription}>Productivity, conversion, design & more</div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Free</div>
                <div className={styles.statDescription}>No hidden costs or premium tiers</div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statNumber}>0</div>
                <div className={styles.statLabel}>Registration</div>
                <div className={styles.statDescription}>Use tools without signing up</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Commitment</h2>
            <div className={styles.commitmentContent}>
              <p className={styles.commitmentText}>
                While Utlizer is built by a dedicated team of developers and designers, 
                our focus is on the tools and the users, not on promoting ourselves. 
                We believe that the best products speak for themselves.
              </p>
              <p className={styles.commitmentText}>
                Our commitment to you is simple: we will continue to provide free, 
                high-quality tools that solve real problems. We will respect your privacy, 
                maintain our tools' performance, and listen to your feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_FOOTER} />
        </div>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
              <p className={styles.ctaDescription}>
                Explore our collection of free utility tools and discover how they can 
                help you be more productive and efficient.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/tools" className={styles.ctaButton}>
                  <span className={styles.buttonIcon}>🛠️</span>
                  Browse All Tools
                </Link>
                <Link href="/contact" className={styles.ctaSecondaryButton}>
                  <span className={styles.buttonIcon}>💬</span>
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
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
