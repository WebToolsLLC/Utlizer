// src/pages/tools/[category]/[tool]/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import { getToolData, getAllToolPaths, getRelatedTools } from '@/data/toolsData';
import styles from '@/styles/pages/Tool.module.css';

// Import tool components
import TimerComponent from '@/components/tools/productivity/TimerComponent';
import WordCounterComponent from '@/components/tools/text-writing/WordCounterComponent';
import PasswordGeneratorComponent from '@/components/tools/networking-it/PasswordGeneratorComponent';
import ColorConverterComponent from '@/components/tools/conversion/ColorConverterComponent';
import QrCodeComponent from '@/components/tools/productivity/QrCodeComponent';
import RandomNumberComponent from '@/components/tools/productivity/RandomNumberComponent';
import TextCaseConverterComponent from '@/components/tools/text-writing/TextCaseConverterComponent';
import BmiCalculatorComponent from '@/components/tools/conversion/BmiCalculatorComponent';
import UnitConverterComponent from '@/components/tools/conversion/UnitConverterComponent';

export default function ToolPage() {
  const router = useRouter();
  const { category, tool } = router.query;
  const [toolData, setToolData] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);

  useEffect(() => {
    if (category && tool) {
      const data = getToolData(category, tool);
      const related = getRelatedTools(category, tool, 4);
      setToolData(data);
      setRelatedTools(related);
    }
  }, [category, tool]);

  const renderToolComponent = () => {
    if (!toolData) return null;

    switch (toolData.component) {
      case 'TimerComponent':
        return <TimerComponent />;
      case 'WordCounterComponent':
        return <WordCounterComponent />;
      case 'PasswordGeneratorComponent':
        return <PasswordGeneratorComponent />;
      case 'ColorConverterComponent':
        return <ColorConverterComponent />;
      case 'QrCodeComponent':
        return <QrCodeComponent />;
      case 'RandomNumberComponent':
        return <RandomNumberComponent />;
      case 'TextCaseConverterComponent':
        return <TextCaseConverterComponent />;
      case 'BmiCalculatorComponent':
        return <BmiCalculatorComponent />;
      case 'UnitConverterComponent':
        return <UnitConverterComponent />;
      default:
        return (
          <div className={styles.placeholderTool}>
            <div className={styles.placeholderIcon}>🔧</div>
            <h3 className={styles.placeholderTitle}>Tool Coming Soon</h3>
            <p className={styles.placeholderDescription}>
              This tool is currently under development. Check back soon!
            </p>
          </div>
        );
    }
  };

  if (!toolData) {
    return <div>Loading...</div>;
  }

  const metaData = {
    title: toolData.metaTitle,
    description: toolData.metaDescription,
    keywords: toolData.keywords,
    url: `/tools/${category}/${tool}`
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": toolData.name,
    "description": toolData.description,
    "url": `https://ultizer.pages.dev/tools/${category}/${tool}`,
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": toolData.name,
      "description": toolData.description,
      "applicationCategory": toolData.category,
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": toolData.popularity / 20,
        "ratingCount": Math.floor(toolData.popularity / 10)
      }
    }
  };

  return (
    <>
      <MetaTags {...metaData} />
      <SchemaMarkup schema={toolSchema} />
      
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
                <Link href={`/tools/${category}`} className={styles.breadcrumbLink}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </Link>
                <span className={styles.breadcrumbSeparator}>→</span>
                <span className={styles.breadcrumbCurrent}>{toolData.name}</span>
              </div>
              
              <div className={styles.toolHeader}>
                <div className={styles.toolIcon}>
                  <span className={styles.toolEmoji}>
                    {category === 'productivity' && '⏰'}
                    {category === 'text-writing' && '📝'}
                    {category === 'networking-it' && '🔐'}
                    {category === 'conversion' && '🎨'}
                    {category === 'file-management' && '📁'}
                    {category === 'design-visual' && '🎨'}
                    {category === 'educational' && '📚'}
                  </span>
                </div>
                <div className={styles.toolInfo}>
                  <h1 className={styles.toolTitle}>{toolData.name}</h1>
                  <p className={styles.toolDescription}>{toolData.description}</p>
                  <div className={styles.toolMeta}>
                    <div className={styles.toolStats}>
                      <span className={styles.toolCategory}>{toolData.category}</span>
                      <span className={styles.toolTime}>{toolData.estimatedTime}</span>
                      <span className={styles.toolDifficulty}>{toolData.difficulty}</span>
                    </div>
                    <div className={styles.toolRating}>
                      <div className={styles.stars}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={i < Math.round(toolData.popularity / 20) ? styles.starFilled : styles.star}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className={styles.ratingText}>({toolData.popularity}% popular)</span>
                    </div>
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

        {/* Tool Content */}
        <section className={styles.toolSection}>
          <div className={styles.container}>
            <div className={styles.toolContent}>
              {renderToolComponent()}
            </div>
          </div>
        </section>

        {/* In-Content Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_INCONTENT} />
        </div>

        {/* Use Cases Section */}
        <section className={styles.useCasesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Use Cases</h2>
            <div className={styles.useCasesGrid}>
              {toolData.useCases.map((useCase, index) => (
                <div key={index} className={styles.useCaseCard}>
                  <div className={styles.useCaseIcon}>
                    <span className={styles.useCaseEmoji}>
                      {index === 0 && '💼'}
                      {index === 1 && '🎯'}
                      {index === 2 && '⚡'}
                      {index === 3 && '🚀'}
                      {index === 4 && '✨'}
                    </span>
                  </div>
                  <h3 className={styles.useCaseTitle}>{useCase}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_SIDEBAR} />
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Related Tools</h2>
              <div className={styles.relatedGrid}>
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.category}/${relatedTool.slug}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedIcon}>
                      <span className={styles.relatedEmoji}>
                        {relatedTool.category === 'productivity' && '⏰'}
                        {relatedTool.category === 'text-writing' && '📝'}
                        {relatedTool.category === 'networking-it' && '🔐'}
                        {relatedTool.category === 'conversion' && '🎨'}
                        {relatedTool.category === 'file-management' && '📁'}
                        {relatedTool.category === 'design-visual' && '🎨'}
                        {relatedTool.category === 'educational' && '📚'}
                      </span>
                    </div>
                    <div className={styles.relatedContent}>
                      <h3 className={styles.relatedName}>{relatedTool.name}</h3>
                      <p className={styles.relatedDescription}>{relatedTool.description}</p>
                      <div className={styles.relatedMeta}>
                        <span className={styles.relatedCategory}>{relatedTool.category}</span>
                        <span className={styles.relatedTime}>{relatedTool.estimatedTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_FOOTER} />
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllToolPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const toolData = getToolData(params.category, params.tool);
  const relatedTools = getRelatedTools(params.category, params.tool, 4);
  
  return {
    props: {
      toolData,
      relatedTools,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}