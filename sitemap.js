// sitemap.js
const { tools } = require('./src/data/toolsData')

function generateSitemap() {
  const baseUrl = 'https://ultizer.pages.dev'
  const pages = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/tools'
  ]

  // Add all tool pages
  tools.forEach(tool => {
    pages.push(`/tools/${tool.category}/${tool.id}`)
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(page => {
      return `
    <url>
      <loc>${baseUrl}${page}</loc>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : page.includes('/tools/') ? '0.8' : '0.6'}</priority>
    </url>
      `
    })
    .join('')}
</urlset>
  `

  return sitemap
}

module.exports = generateSitemap
