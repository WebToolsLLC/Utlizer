// src/components/seo/SchemaMarkup.js
import Head from 'next/head';

const SchemaMarkup = ({ 
  type = 'WebSite',
  data = {},
  toolData = null,
  categoryData = null 
}) => {
  let schema = {};

  switch (type) {
    case 'WebSite':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Utlizer",
        "url": "https://ultizer.pages.dev",
        "description": "Free online utility tools for productivity, conversion, and daily tasks",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ultizer.pages.dev/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "sameAs": [
          "https://github.com/WebToolsLLC/Utlizer"
        ]
      };
      break;

    case 'WebPage':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": data.title,
        "description": data.description,
        "url": data.url,
        "isPartOf": {
          "@type": "WebSite",
          "name": "Utlizer",
          "url": "https://ultizer.pages.dev"
        },
        "breadcrumb": data.breadcrumb || null,
        "mainEntity": toolData ? {
          "@type": "SoftwareApplication",
          "name": toolData.name,
          "description": toolData.description,
          "applicationCategory": "Utility",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        } : null
      };
      break;

    case 'Tool':
      schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": toolData.name,
        "description": toolData.description,
        "applicationCategory": "Utility",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": "1.0",
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "author": {
          "@type": "Organization",
          "name": "Utlizer"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Utlizer",
          "url": "https://ultizer.pages.dev"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1000"
        },
        "keywords": toolData.keywords,
        "url": `https://ultizer.pages.dev/tools/${toolData.category}/${toolData.slug}/`
      };
      break;

    case 'HowTo':
      schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use ${toolData.name}`,
        "description": toolData.description,
        "image": `https://ultizer.pages.dev/images/tools/${toolData.category}/${toolData.icon}`,
        "totalTime": toolData.estimatedTime,
        "difficulty": toolData.difficulty,
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Web Browser"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Access the Tool",
            "text": `Visit ${toolData.name} on Utlizer`,
            "url": `https://ultizer.pages.dev/tools/${toolData.category}/${toolData.slug}/`
          },
          {
            "@type": "HowToStep",
            "name": "Use the Tool",
            "text": toolData.description
          }
        ]
      };
      break;

    case 'FAQPage':
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is ${toolData.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": toolData.description
            }
          },
          {
            "@type": "Question",
            "name": "Is this tool free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all tools on Utlizer are completely free to use with no registration required."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to install anything?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, all tools work directly in your web browser without any installation."
            }
          }
        ]
      };
      break;

    case 'BreadcrumbList':
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      break;

    default:
      schema = data;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default SchemaMarkup;
