import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '@/styles/components/ToolCard.module.css';

const ToolCard = ({ tool, category }) => {
  const router = useRouter();
  const { slug, title, description, icon, popularity } = tool;
  
  const handleCardClick = () => {
    // Track tool clicks for analytics
    if (window.gtag) {
      window.gtag('event', 'tool_click', {
        tool_name: title,
        tool_category: category,
        event_category: 'engagement'
      });
    }
    
    router.push(`/tools/${category}/${slug}`);
  };

  return (
    <div 
      className={styles.card} 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`Open ${title} tool`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.icon}>
          <Image
            src={`/images/tools/${category}/${icon}`}
            alt={title}
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.cardFooter}>
        <span className={styles.popularity}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < Math.round(popularity) ? styles.starFilled : styles.star}
            >
              ★
            </span>
          ))}
        </span>
        
        <span className={styles.cta}>
          Use Tool →
        </span>
      </div>
    </div>
  );
};

export default ToolCard;
