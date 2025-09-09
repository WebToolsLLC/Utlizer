// src/components/layout/AdSenseUnit.js
import { useEffect, useState } from 'react';
import Script from 'next/script';

const AdSenseUnit = ({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  style = { display: 'block' },
  className = '',
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if AdSense is loaded
    if (window.adsbygoogle) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Initialize ads when component becomes visible
    if (isLoaded && isVisible && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [isLoaded, isVisible]);

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    const adElement = document.getElementById(`adsense-${slot}`);
    if (adElement) {
      observer.observe(adElement);
    }

    return () => {
      if (adElement) {
        observer.unobserve(adElement);
      }
    };
  }, []);

  if (!adClient) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <ins
        id={`adsense-${slot}`}
        className={`adsbygoogle ${className}`}
        style={style}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </>
  );
};

// Predefined ad units for different placements
export const AdUnits = {
  HEADER_BANNER: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT,
    format: 'auto',
    style: { display: 'block', width: '728px', height: '90px' },
    className: 'header-banner-ad'
  },
  
  SIDEBAR: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
    format: 'auto',
    style: { display: 'block', width: '300px', height: '250px' },
    className: 'sidebar-ad'
  },
  
  IN_CONTENT: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT,
    format: 'auto',
    style: { display: 'block', width: '728px', height: '90px' },
    className: 'content-ad'
  },
  
  FOOTER: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT,
    format: 'auto',
    style: { display: 'block', width: '728px', height: '90px' },
    className: 'footer-ad'
  },
  
  MOBILE_BANNER: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_MOBILE_SLOT,
    format: 'auto',
    style: { display: 'block', width: '320px', height: '50px' },
    className: 'mobile-banner-ad'
  }
};

export default AdSenseUnit;