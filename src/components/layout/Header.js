import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import styles from '@/styles/components/Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img 
            src="/images/logos/logo.svg" 
            alt="Utlizer Tools" 
            width={150}
            height={40}
          />
        </Link>
        
        <Navigation 
          isMobileOpen={isMobileMenuOpen} 
          onMobileToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <div className={styles.actions}>
          <button 
            className={styles.themeToggle}
            aria-label="Toggle dark mode"
            onClick={() => {
              // Implement theme toggle functionality
              document.documentElement.classList.toggle('dark-theme');
            }}
          >
            <span className={styles.themeIcon}>🌙</span>
          </button>
          
          <button 
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
