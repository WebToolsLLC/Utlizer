# Utlizer - Free Online Utility Tools

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm run export
   ```

## 📁 Project Structure

```
Utlizer/
├── 📁 public/                 # Static assets
├── 📁 src/
│   ├── 📁 components/          # React components
│   ├── 📁 pages/              # Next.js pages
│   ├── 📁 data/               # Tool data and metadata
│   ├── 📁 utils/              # Utility functions
│   └── 📁 styles/             # CSS styles
├── package.json               # Dependencies
├── next.config.js             # Next.js configuration
└── cloudflare.json            # Cloudflare Pages config
```

## 🛠️ Available Tools

### Productivity & Time Management
- Online Timer
- Online Stopwatch  
- Online Alarm Clock
- World Clock
- Online Notes
- URL Shortener
- Random Number Generator
- QR Code Generator
- Pomodoro Timer

### File & Data Management
- PDF Converter
- File Compressor
- PDF Editor
- Image Resizer
- OCR Converter
- File Merger
- Virus Scanner
- File Renamer
- Website Downloader
- Signature Creator

### Conversion Tools
- Currency Converter
- Unit Converter
- BMI Calculator
- Color Converter
- Temperature Converter
- Time Converter
- Encoder/Decoder

### Text & Writing Aids
- Grammar Checker
- Word Counter
- Spell Checker
- Text Case Converter
- Reverse Text Generator
- Character Map
- Dictionary

### Design & Visual Tools
- Color Picker
- Screenshot Tool
- Favicon Generator
- Accessibility Checker
- Image Cropper

### Networking & IT
- IP Address Lookup
- Internet Speed Test
- Password Generator
- Ping Tool
- Uptime Monitor
- Whois Lookup

### Educational & Miscellaneous
- Periodic Table
- Scientific Calculator
- Online Translator
- Digital Ruler
- Morse Code Translator

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://ultizer.pages.dev
NEXT_PUBLIC_SITE_NAME=Utlizer
NEXT_PUBLIC_SITE_DESCRIPTION=Free online utility tools

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_HEADER_SLOT=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_FOOTER_SLOT=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_MOBILE_SLOT=xxxxxxxxxx

# Google Search Console
NEXT_PUBLIC_GSC_VERIFICATION=xxxxxxxxxx
```

## 🚀 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `out`
4. Add environment variables in Cloudflare Pages dashboard

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Static export for Cloudflare Pages
npm run export

# Linting
npm run lint
npm run lint:fix
```

## 📊 SEO & Analytics

### SEO Features
- Dynamic meta tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt
- Canonical URLs
- Open Graph tags
- Twitter Cards

### Analytics Integration
- Google Analytics 4
- Google Search Console
- AdSense integration
- Performance monitoring

## 🎯 AdSense Integration

### Ad Placements
- Header banner (728x90)
- Sidebar (300x250)
- In-content (728x90)
- Footer (728x90)
- Mobile banner (320x50)

### AdSense Setup
1. Apply for AdSense approval
2. Get your publisher ID and ad slots
3. Add them to `.env.local`
4. Deploy to production

## 🔍 Search Engine Optimization

### URL Structure
- Homepage: `https://ultizer.pages.dev/`
- Categories: `https://ultizer.pages.dev/tools/productivity/`
- Tools: `https://ultizer.pages.dev/tools/productivity/online-timer/`

### Meta Tags Strategy
- Dynamic titles: `{Tool Name} - Free Online Tool | Utlizer`
- Meta descriptions: 150-160 characters
- Keywords: Long-tail keywords for each tool
- Canonical URLs: Prevent duplicate content

### Structured Data
- WebSite schema for homepage
- WebPage schema for each tool
- HowTo schema for tool instructions
- FAQPage schema for common questions

## 📱 Responsive Design

- Mobile-first approach
- Responsive ad units
- Touch-friendly interfaces
- Fast loading times
- Progressive Web App features

## 🛡️ Security

- Content Security Policy
- XSS protection
- CSRF protection
- Secure headers
- HTTPS enforcement

## 📈 Performance

- Static site generation
- Image optimization
- Code splitting
- Lazy loading
- CDN distribution via Cloudflare

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- Email: contact@ultizer.pages.dev
- GitHub Issues: [WebToolsLLC/Utlizer](https://github.com/WebToolsLLC/Utlizer/issues)
- Website: [https://ultizer.pages.dev](https://ultizer.pages.dev)
