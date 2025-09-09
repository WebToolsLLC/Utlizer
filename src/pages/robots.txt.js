// src/pages/robots.txt.js
const Robots = () => {
  return null;
};

export async function getServerSideProps({ res }) {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://ultizer.pages.dev/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /tools/
Allow: /about
Allow: /contact
Allow: /privacy
Allow: /terms`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default Robots;
