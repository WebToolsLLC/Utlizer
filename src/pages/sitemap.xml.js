// src/pages/sitemap.xml.js
import { getAllToolPaths, getCategoryPaths } from '@/data/toolsData';

const Sitemap = () => {
  return null;
};

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://ultizer.pages.dev';
  
  // Get all tool paths
  const toolPaths = getAllToolPaths();
  const categoryPaths = getCategoryPaths();
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/tools'
  ];
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
  
  ${categoryPaths.map(category => `
    <url>
      <loc>${baseUrl}/tools/${category.params.category}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`).join('')}
  
  ${toolPaths.map(tool => `
    <url>
      <loc>${baseUrl}/tools/${tool.params.category}/${tool.params.tool}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
