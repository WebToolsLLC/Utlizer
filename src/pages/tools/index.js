// src/pages/tools/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MetaTags from '@/components/seo/MetaTags';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import AdSenseUnit from '@/components/layout/AdSenseUnit';
import { getAllCategories, searchTools, getAllTools } from '@/data/toolsData';
import styles from '@/styles/pages/Tools.module.css';

export default function ToolsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [allTools, setAllTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    setCategories(getAllCategories());
    setAllTools(getAllTools());
    setFilteredTools(getAllTools());
    
    // Handle search query from URL
    if (router.query.search) {
      setSearchTerm(router.query.search);
      handleSearch(router.query.search);
    }
  }, [router.query.search]);

  const handleSearch = (term) => {
    const searchResults = searchTools(term);
    setFilteredTools(searchResults);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredTools(allTools);
    } else {
      const categoryTools = allTools.filter(tool => tool.category === categoryId);
      setFilteredTools(categoryTools);
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sorted = [...filteredTools].sort((a, b) => {
      switch (sortType) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });
    setFilteredTools(sorted);
  };

  const metaData = {
    title: 'All Utility Tools - Browse Our Complete Collection | Utlizer',
    description: 'Explore our complete collection of 50+ free utility tools. Find productivity tools, converters, text editors, design tools, and more. No registration required.',
    keywords: 'utility tools, online tools, productivity tools, free tools, converters, calculators, text tools, design tools',
    url: '/tools'
  };

  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Utility Tools",
    "description": metaData.description,
    "url": "https://ultizer.pages.dev/tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredTools.length,
      "itemListElement": filteredTools.map((tool, index) => ({
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
      <SchemaMarkup schema={toolsSchema} />
      
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
              <h1 className={styles.pageTitle}>All Utility Tools</h1>
              <p className={styles.pageDescription}>
                Discover our complete collection of {allTools.length}+ free utility tools. 
                Find exactly what you need for productivity, conversion, design, and more.
              </p>
              
              {/* Search Bar */}
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for tools..."
                    className={styles.searchInput}
                  />
                  <button className={styles.searchButton}>
                    🔍 Search
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className={styles.filtersSection}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.tools.length})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="name">Name</option>
                    <option value="category">Category</option>
                    <option value="difficulty">Difficulty</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_HEADER} />
        </div>

        {/* Results Summary */}
        <section className={styles.resultsSection}>
          <div className={styles.container}>
            <div className={styles.resultsSummary}>
              <h2 className={styles.resultsTitle}>
                {searchTerm ? `Search Results for "${searchTerm}"` : 'All Tools'}
              </h2>
              <p className={styles.resultsCount}>
                {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className={styles.toolsSection}>
          <div className={styles.container}>
            {filteredTools.length > 0 ? (
              <div className={styles.toolsGrid}>
                {filteredTools.map((tool) => (
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
                        <div className={styles.toolCategory}>
                          <span className={styles.categoryLabel}>Category:</span>
                          <span className={styles.categoryValue}>{tool.category}</span>
                        </div>
                        <div className={styles.toolTime}>
                          <span className={styles.timeLabel}>Time:</span>
                          <span className={styles.timeValue}>{tool.estimatedTime}</span>
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
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3 className={styles.noResultsTitle}>No tools found</h3>
                <p className={styles.noResultsDescription}>
                  Try adjusting your search terms or browse by category
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setFilteredTools(allTools);
                  }}
                  className={styles.clearFiltersButton}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Sidebar Ad */}
        <div className={styles.adContainer}>
          <AdSenseUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_SIDEBAR} />
        </div>

        {/* Categories Overview */}
        <section className={styles.categoriesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Browse by Category</h2>
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