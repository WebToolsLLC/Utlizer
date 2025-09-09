// src/pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit, { AdUnits } from '@/components/layout/AdSenseUnit';
import { getFeaturedTools, getPopularTools, getAllCategories } from '@/data/toolsData';
import styles from '@/styles/pages/Home.module.css';

export default function Home() {
  const [featuredTools, setFeaturedTools] = useState([]);
  const [popularTools, setPopularTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFeaturedTools(getFeaturedTools());
    setPopularTools(getPopularTools(8));
    setCategories(getAllCategories());
  }, []);

  const metaData = {
    title: 'Utlizer - Free Online Utility Tools for Productivity & Daily Tasks',
    description: 'Discover 50+ free online utility tools for productivity, file management, conversion, text editing, design, networking, and education. No registration required.',
    keywords: 'online tools, utility tools, productivity tools, free tools, calculator, converter, timer, file management, text tools, design tools',
    url: '/'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tools?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup type="WebSite" />
      
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
              <div className={styles.heroBadge}>
                <span className={styles.badgeIcon}>✨</span>
                <span>50+ Free Tools Available</span>
              </div>
              <h1 className={styles.heroTitle}>
                Free Online Utility Tools
                <span className={styles.heroSubtitle}>for Productivity & Daily Tasks</span>
              </h1>
              <p className={styles.heroDescription}>
                Access powerful tools for productivity, file management, conversion, 
                text editing, design, networking, and education. No registration required.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for tools..."
                    className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchButton}>
                    🔍 Search
                  </button>
                </div>
              </form>

              <div className={styles.heroActions}>
                <Link href="/tools" className={styles.primaryButton}>
                  <span className={styles.buttonIcon}>🛠️</span>
                  Browse All Tools
                </Link>
                <Link href="#featured" className={styles.secondaryButton}>
                  <span className={styles.buttonIcon}>⭐</span>
                  Featured Tools
                </Link>
              </div>

              {/* Quick Stats */}
              <div className={styles.quickStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Tools</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>7</div>
                  <div className={styles.statLabel}>Categories</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>100%</div>
                  <div className={styles.statLabel}>Free</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>0</div>
                  <div className={styles.statLabel}>Registration</div>
                </div>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.heroIllustration}>
                <div className={styles.toolIcon}>⏰</div>
                <div className={styles.toolIcon}>📝</div>
                <div className={styles.toolIcon}>🔐</div>
                <div className={styles.toolIcon}>🎨</div>
                <div className={styles.toolIcon}>📱</div>
                <div className={styles.toolIcon}>🎲</div>
                <div className={styles.toolIcon}>🔤</div>
                <div className={styles.toolIcon}>⚖️</div>
                <div className={styles.toolIcon}>📏</div>
                <div className={styles.toolIcon}>🔗</div>
              </div>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit {...AdUnits.HEADER_BANNER} />
        </div>

        {/* Featured Tools */}
        <section id="featured" className={styles.featuredSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured Tools</h2>
              <p className={styles.sectionDescription}>
                Our most popular and useful tools, handpicked for daily productivity
              </p>
            </div>
            <div className={styles.toolsGrid}>
              {featuredTools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.category}/${tool.slug}`}
                  className={styles.toolCard}
                >
                  <div className={styles.toolCardHeader}>
                    <div className={styles.toolIcon}>
                      <span className={styles.toolEmoji}>
                        {tool.category === 'productivity' && '⏰'}
                        {tool.category === 'text-writing' && '📝'}
                        {tool.category === 'networking-it' && '🔐'}
                        {tool.category === 'conversion' && '🎨'}
                        {tool.category === 'file-management' && '📁'}
                        {tool.category === 'design-visual' && '🎨'}
                        {tool.category === 'educational' && '📚'}
                      </span>
                    </div>
                    <div className={styles.toolBadge}>Featured</div>
                  </div>
                  <div className={styles.toolContent}>
                    <h3 className={styles.toolName}>{tool.name}</h3>
                    <p className={styles.toolDescription}>{tool.description}</p>
                    <div className={styles.toolMeta}>
                      <span className={styles.toolCategory}>{tool.category}</span>
                      <span className={styles.toolTime}>{tool.estimatedTime}</span>
                    </div>
                    <div className={styles.toolRating}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.round(tool.popularity / 20) ? styles.starFilled : styles.star}
                        >
                          ★
                        </span>
                      ))}
                      <span className={styles.ratingText}>({tool.popularity}%)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.sectionFooter}>
              <Link href="/tools" className={styles.viewAllButton}>
                View All Tools →
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className={styles.categoriesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tool Categories</h2>
              <p className={styles.sectionDescription}>
                Explore tools organized by category for easy discovery
              </p>
            </div>
            <div className={styles.categoriesGrid}>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/tools/${category.id}`}
                  className={styles.categoryCard}
                  style={{ '--category-color': category.color }}
                >
                  <div className={styles.categoryIcon}>
                    <span className={styles.categoryEmoji}>
                      {category.id === 'productivity' && '⏰'}
                      {category.id === 'file-management' && '📁'}
                      {category.id === 'conversion' && '🔄'}
                      {category.id === 'text-writing' && '📝'}
                      {category.id === 'design-visual' && '🎨'}
                      {category.id === 'networking-it' && '🌐'}
                      {category.id === 'educational' && '📚'}
                    </span>
                  </div>
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                    <div className={styles.categoryStats}>
                      <span className={styles.toolCount}>{category.tools.length} tools</span>
                      <span className={styles.categoryArrow}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tools */}
        <section className={styles.popularSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Most Popular Tools</h2>
              <p className={styles.sectionDescription}>
                The tools our users love and use most frequently
              </p>
            </div>
            <div className={styles.popularGrid}>
              {popularTools.map((tool, index) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.category}/${tool.slug}`}
                  className={styles.popularCard}
                >
                  <div className={styles.popularRank}>#{index + 1}</div>
                  <div className={styles.popularContent}>
                    <div className={styles.popularIcon}>
                      <span className={styles.popularEmoji}>
                        {tool.category === 'productivity' && '⏰'}
                        {tool.category === 'text-writing' && '📝'}
                        {tool.category === 'networking-it' && '🔐'}
                        {tool.category === 'conversion' && '🎨'}
                        {tool.category === 'file-management' && '📁'}
                        {tool.category === 'design-visual' && '🎨'}
                        {tool.category === 'educational' && '📚'}
                      </span>
                    </div>
                    <div className={styles.popularInfo}>
                      <h3 className={styles.popularName}>{tool.name}</h3>
                      <p className={styles.popularDescription}>{tool.description}</p>
                      <div className={styles.popularMeta}>
                        <span className={styles.popularCategory}>{tool.category}</span>
                        <span className={styles.popularRating}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < Math.round(tool.popularity / 20) ? styles.starFilled : styles.star}
                            >
                              ★
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit {...AdUnits.SIDEBAR} />
        </div>

        {/* Why Choose Utlizer */}
        <section className={styles.whySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Why Choose Utlizer?</h2>
              <p className={styles.sectionDescription}>
                Discover what makes our tools the best choice for your needs
              </p>
            </div>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🚀</div>
                <h3 className={styles.featureTitle}>Lightning Fast</h3>
                <p className={styles.featureDescription}>
                  All tools load instantly and provide immediate results
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔒</div>
                <h3 className={styles.featureTitle}>Privacy First</h3>
                <p className={styles.featureDescription}>
                  Your data stays in your browser - no server storage
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3 className={styles.featureTitle}>Mobile Friendly</h3>
                <p className={styles.featureDescription}>
                  Optimized for all devices - desktop, tablet, and mobile
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🆓</div>
                <h3 className={styles.featureTitle}>Completely Free</h3>
                <p className={styles.featureDescription}>
                  No registration, no subscriptions, no hidden costs
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎯</div>
                <h3 className={styles.featureTitle}>Accurate Results</h3>
                <p className={styles.featureDescription}>
                  Precise calculations and conversions you can trust
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureTitle}>Always Available</h3>
                <p className={styles.featureDescription}>
                  Works offline and available 24/7 without downtime
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit {...AdUnits.FOOTER} />
        </div>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Boost Your Productivity?</h2>
              <p className={styles.ctaDescription}>
                Join thousands of users who rely on Utlizer for their daily tasks. 
                Start using our tools today and experience the difference.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/tools" className={styles.ctaButton}>
                  <span className={styles.buttonIcon}>🛠️</span>
                  Explore All Tools
                </Link>
                <Link href="/about" className={styles.ctaSecondaryButton}>
                  <span className={styles.buttonIcon}>ℹ️</span>
                  Learn More
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
