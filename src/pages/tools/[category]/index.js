// src/pages/tools/[category]/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import { getCategoryData, getToolsByCategory, getCategoryPaths } from '@/data/toolsData';
import styles from '@/styles/pages/Category.module.css';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [categoryData, setCategoryData] = useState(null);
  const [tools, setTools] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    if (category) {
      const catData = getCategoryData(category);
      const categoryTools = getToolsByCategory(category);
      setCategoryData(catData);
      setTools(categoryTools);
    }
  }, [category]);

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sorted = [...tools].sort((a, b) => {
      switch (sortType) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'time':
          return a.estimatedTime.localeCompare(b.estimatedTime);
        default:
          return 0;
      }
    });
    setTools(sorted);
  };

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  const metaData = {
    title: `${categoryData.name} Tools - Free Online ${categoryData.name} Tools | Utlizer`,
    description: `Discover our collection of ${tools.length} free ${categoryData.name.toLowerCase()} tools. ${categoryData.description}`,
    keywords: `${categoryData.name.toLowerCase()}, tools, free tools, online tools, ${categoryData.name.toLowerCase()} utilities`,
    url: `/tools/${category}`
  };

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryData.name} Tools`,
    "description": categoryData.description,
    "url": `https://ultizer.pages.dev/tools/${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://ultizer.pages.dev/tools/${tool.category}/${tool.slug}`,
          "applicationCategory": tool.category,
          "operatingSystem": "Web Browser"
        }
      }))
    }
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup schema={categorySchema} />
      
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
              <div className={styles.breadcrumb}>
                <Link href="/tools" className={styles.breadcrumbLink}>All Tools</Link>
                <span className={styles.breadcrumbSeparator}>→</span>
                <span className={styles.breadcrumbCurrent}>{categoryData.name}</span>
              </div>
              
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <span className={styles.categoryEmoji}>
                    {category === 'productivity' && '⏰'}
                    {category === 'file-management' && '📁'}
                    {category === 'conversion' && '🔄'}
                    {category === 'text-writing' && '📝'}
                    {category === 'design-visual' && '🎨'}
                    {category === 'networking-it' && '🌐'}
                    {category === 'educational' && '📚'}
                  </span>
                </div>
                <div className={styles.categoryInfo}>
                  <h1 className={styles.categoryTitle}>{categoryData.name}</h1>
                  <p className={styles.categoryDescription}>{categoryData.description}</p>
                  <div className={styles.categoryStats}>
                    <span className={styles.toolCount}>{tools.length} tools available</span>
                    <span className={styles.categoryColor} style={{ color: categoryData.color }}>
                      {categoryData.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_HEADER} />
        </div>

        {/* Sort Controls */}
        <section className={styles.sortSection}>
          <div className={styles.container}>
            <div className={styles.sortControls}>
              <div className={styles.sortGroup}>
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="popularity">Popularity</option>
                  <option value="name">Name</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="time">Time Required</option>
                </select>
              </div>
              
              <div className={styles.resultsInfo}>
                <span className={styles.resultsCount}>
                  {tools.length} tool{tools.length !== 1 ? 's' : ''} in this category
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className={styles.toolsSection}>
          <div className={styles.container}>
            {tools.length > 0 ? (
              <div className={styles.toolsGrid}>
                {tools.map((tool) => (
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
                      <div className={styles.toolBadges}>
                        {tool.featured && <span className={styles.featuredBadge}>Featured</span>}
                        <span className={styles.difficultyBadge}>{tool.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className={styles.toolContent}>
                      <h3 className={styles.toolName}>{tool.name}</h3>
                      <p className={styles.toolDescription}>{tool.description}</p>
                      
                      <div className={styles.toolMeta}>
                        <div className={styles.toolTime}>
                          <span className={styles.timeLabel}>Time:</span>
                          <span className={styles.timeValue}>{tool.estimatedTime}</span>
                        </div>
                        <div className={styles.toolDifficulty}>
                          <span className={styles.difficultyLabel}>Level:</span>
                          <span className={styles.difficultyValue}>{tool.difficulty}</span>
                        </div>
                      </div>
                      
                      <div className={styles.toolRating}>
                        <div className={styles.stars}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < Math.round(tool.popularity / 20) ? styles.starFilled : styles.star}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className={styles.ratingText}>({tool.popularity}%)</span>
                      </div>
                      
                      <div className={styles.toolUseCases}>
                        <span className={styles.useCasesLabel}>Use cases:</span>
                        <div className={styles.useCasesList}>
                          {tool.useCases.slice(0, 3).map((useCase, index) => (
                            <span key={index} className={styles.useCase}>
                              {useCase}
                            </span>
                          ))}
                          {tool.useCases.length > 3 && (
                            <span className={styles.moreUseCases}>
                              +{tool.useCases.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.noTools}>
                <div className={styles.noToolsIcon}>🔧</div>
                <h3 className={styles.noToolsTitle}>No tools found</h3>
                <p className={styles.noToolsDescription}>
                  We're working on adding more tools to this category. Check back soon!
                </p>
                <Link href="/tools" className={styles.browseAllButton}>
                  Browse All Tools
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_SIDEBAR} />
        </div>

        {/* Related Categories */}
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Explore Other Categories</h2>
            <div className={styles.relatedGrid}>
              {/* This would be populated with other categories */}
              <Link href="/tools" className={styles.relatedCard}>
                <div className={styles.relatedIcon}>🛠️</div>
                <div className={styles.relatedContent}>
                  <h3 className={styles.relatedName}>All Tools</h3>
                  <p className={styles.relatedDescription}>Browse our complete collection</p>
                </div>
              </Link>
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

export async function getStaticPaths() {
  const paths = getCategoryPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryData = getCategoryData(params.category);
  const tools = getToolsByCategory(params.category);
  
  return {
    props: {
      categoryData,
      tools,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}