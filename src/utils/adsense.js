// src/utils/adsense.js
export const AdSenseConfig = {
  // AdSense Client ID (replace with your actual client ID)
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxx',
  
  // Ad slots configuration
  slots: {
    header: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || 'xxxxxxxxxx',
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || 'xxxxxxxxxx',
    content: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || 'xxxxxxxxxx',
    footer: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || 'xxxxxxxxxx',
    mobile: process.env.NEXT_PUBLIC_ADSENSE_MOBILE_SLOT || 'xxxxxxxxxx'
  },
  
  // Ad placement rules
  placementRules: {
    // Show ads on these pages
    allowedPages: ['/', '/tools', '/tools/*'],
    
    // Don't show ads on these pages
    blockedPages: ['/privacy', '/terms', '/contact'],
    
    // Minimum content length before showing ads
    minContentLength: 200,
    
    // Ad frequency (show ad every X paragraphs)
    adFrequency: 3
  },
  
  // Responsive ad configurations
  responsiveConfigs: {
    mobile: {
      banner: { width: 320, height: 50 },
      rectangle: { width: 300, height: 250 },
      square: { width: 250, height: 250 }
    },
    tablet: {
      banner: { width: 728, height: 90 },
      rectangle: { width: 300, height: 250 },
      leaderboard: { width: 728, height: 90 }
    },
    desktop: {
      banner: { width: 728, height: 90 },
      rectangle: { width: 300, height: 250 },
      leaderboard: { width: 728, height: 90 },
      skyscraper: { width: 160, height: 600 }
    }
  }
};

// Ad placement strategies
export const AdPlacement = {
  // Header banner - above main content
  HEADER: {
    position: 'header',
    slot: 'header',
    format: 'auto',
    priority: 'high'
  },
  
  // Sidebar - right side of content
  SIDEBAR: {
    position: 'sidebar',
    slot: 'sidebar',
    format: 'auto',
    priority: 'medium'
  },
  
  // In-content - between paragraphs
  IN_CONTENT: {
    position: 'content',
    slot: 'content',
    format: 'auto',
    priority: 'medium'
  },
  
  // Footer - bottom of page
  FOOTER: {
    position: 'footer',
    slot: 'footer',
    format: 'auto',
    priority: 'low'
  },
  
  // Mobile banner - mobile specific
  MOBILE_BANNER: {
    position: 'mobile',
    slot: 'mobile',
    format: 'auto',
    priority: 'high'
  }
};

// AdSense utility functions
export const AdSenseUtils = {
  // Check if ads should be shown on current page
  shouldShowAds: (pathname) => {
    const { allowedPages, blockedPages } = AdSenseConfig.placementRules;
    
    // Check if page is blocked
    if (blockedPages.some(page => pathname.startsWith(page))) {
      return false;
    }
    
    // Check if page is allowed
    return allowedPages.some(page => {
      if (page.endsWith('*')) {
        return pathname.startsWith(page.slice(0, -1));
      }
      return pathname === page;
    });
  },
  
  // Get appropriate ad size for device
  getAdSize: (deviceType, adType) => {
    const configs = AdSenseConfig.responsiveConfigs[deviceType];
    return configs ? configs[adType] : configs?.banner;
  },
  
  // Track ad impressions
  trackImpression: (slot, position) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_impression', {
        ad_slot: slot,
        ad_position: position,
        event_category: 'adsense'
      });
    }
  },
  
  // Track ad clicks
  trackClick: (slot, position) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', {
        ad_slot: slot,
        ad_position: position,
        event_category: 'adsense'
      });
    }
  },
  
  // Check if AdSense is loaded
  isAdSenseLoaded: () => {
    return typeof window !== 'undefined' && window.adsbygoogle;
  },
  
  // Initialize AdSense
  initializeAdSense: () => {
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AdSenseConfig.clientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }
};

// AdSense hook for React components
export const useAdSense = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const checkAdSense = () => {
      if (AdSenseUtils.isAdSenseLoaded()) {
        setIsLoaded(true);
      } else {
        setTimeout(checkAdSense, 100);
      }
    };
    
    checkAdSense();
  }, []);
  
  return {
    isLoaded,
    initializeAdSense: AdSenseUtils.initializeAdSense,
    trackImpression: AdSenseUtils.trackImpression,
    trackClick: AdSenseUtils.trackClick
  };
};

export default AdSenseConfig;
