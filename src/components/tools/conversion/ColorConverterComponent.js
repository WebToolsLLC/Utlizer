// src/components/tools/conversion/ColorConverterComponent.js
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/ColorConverter.module.css';

const ColorConverterComponent = () => {
  const [hexValue, setHexValue] = useState('#3B82F6');
  const [rgbValue, setRgbValue] = useState({ r: 59, g: 130, b: 246 });
  const [hslValue, setHslValue] = useState({ h: 217, s: 91, l: 60 });
  const [hsvValue, setHsvValue] = useState({ h: 217, s: 76, v: 96 });
  const [cmykValue, setCmykValue] = useState({ c: 76, m: 47, y: 0, k: 4 });
  const [colorHistory, setColorHistory] = useLocalStorage('color-history', []);
  const [favorites, setFavorites] = useLocalStorage('color-favorites', []);

  // Convert hex to RGB
  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }, []);

  // Convert RGB to Hex
  const rgbToHex = useCallback((r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }, []);

  // Convert RGB to HSL
  const rgbToHsl = useCallback((r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  // Convert HSL to RGB
  const hslToRgb = useCallback((h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }, []);

  // Convert RGB to HSV
  const rgbToHsv = useCallback((r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
      if (max === r) h = ((g - b) / diff) % 6;
      else if (max === g) h = (b - r) / diff + 2;
      else h = (r - g) / diff + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    const s = max === 0 ? 0 : diff / max;
    const v = max;

    return {
      h: h,
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }, []);

  // Convert RGB to CMYK
  const rgbToCmyk = useCallback((r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  }, []);

  // Update all color values when hex changes
  useEffect(() => {
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      setRgbValue(rgb);
      setHslValue(rgbToHsl(rgb.r, rgb.g, rgb.b));
      setHsvValue(rgbToHsv(rgb.r, rgb.g, rgb.b));
      setCmykValue(rgbToCmyk(rgb.r, rgb.g, rgb.b));
    }
  }, [hexValue, hexToRgb, rgbToHsl, rgbToHsv, rgbToCmyk]);

  // Handle hex input change
  const handleHexChange = (value) => {
    // Ensure hex value starts with #
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setHexValue(value.toUpperCase());
  };

  // Handle RGB input changes
  const handleRgbChange = (component, value) => {
    const newRgb = { ...rgbValue, [component]: Math.max(0, Math.min(255, parseInt(value) || 0)) };
    setRgbValue(newRgb);
    setHexValue(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  // Handle HSL input changes
  const handleHslChange = (component, value) => {
    const newHsl = { ...hslValue, [component]: Math.max(0, Math.min(component === 'h' ? 360 : 100, parseInt(value) || 0)) };
    setHslValue(newHsl);
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgbValue(rgb);
    setHexValue(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  // Add to favorites
  const addToFavorites = () => {
    const colorName = prompt('Enter a name for this color:');
    if (colorName) {
      const newFavorite = {
        id: Date.now(),
        name: colorName,
        hex: hexValue,
        rgb: rgbValue,
        hsl: hslValue,
        createdAt: new Date().toISOString()
      };
      setFavorites([...favorites, newFavorite]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  // Load favorite color
  const loadFavorite = (favorite) => {
    setHexValue(favorite.hex);
    setRgbValue(favorite.rgb);
    setHslValue(favorite.hsl);
  };

  // Add to history
  const addToHistory = () => {
    const newHistoryItem = {
      id: Date.now(),
      hex: hexValue,
      rgb: rgbValue,
      hsl: hslValue,
      timestamp: new Date().toISOString()
    };
    
    // Remove duplicates and keep only last 20
    const filteredHistory = colorHistory.filter(item => item.hex !== hexValue);
    setColorHistory([newHistoryItem, ...filteredHistory].slice(0, 20));
  };

  // Load from history
  const loadFromHistory = (historyItem) => {
    setHexValue(historyItem.hex);
    setRgbValue(historyItem.rgb);
    setHslValue(historyItem.hsl);
  };

  // Copy color value to clipboard
  const copyToClipboard = async (value, format) => {
    try {
      await navigator.clipboard.writeText(value);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy color: ', err);
    }
  };

  // Generate random color
  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    setHexValue(randomHex);
  };

  return (
    <div className={styles.colorConverterContainer}>
      <div className={styles.header}>
        <h2>Color Converter</h2>
        <p>Convert colors between Hex, RGB, HSL, HSV, and CMYK formats</p>
      </div>

      {/* Color Preview */}
      <div className={styles.colorPreview}>
        <div 
          className={styles.colorSwatch}
          style={{ backgroundColor: hexValue }}
        />
        <div className={styles.colorInfo}>
          <div className={styles.colorName}>Current Color</div>
          <div className={styles.colorValue}>{hexValue}</div>
        </div>
        <div className={styles.colorActions}>
          <button onClick={generateRandomColor} className={styles.randomButton}>
            🎲 Random
          </button>
          <button onClick={addToHistory} className={styles.historyButton}>
            📝 Add to History
          </button>
          <button onClick={addToFavorites} className={styles.favoriteButton}>
            ⭐ Add to Favorites
          </button>
        </div>
      </div>

      {/* Color Format Inputs */}
      <div className={styles.colorFormats}>
        {/* HEX */}
        <div className={styles.formatGroup}>
          <label className={styles.formatLabel}>HEX</label>
          <div className={styles.formatInput}>
            <input
              type="text"
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              className={styles.hexInput}
              placeholder="#000000"
            />
            <button 
              onClick={() => copyToClipboard(hexValue, 'HEX')}
              className={styles.copyButton}
            >
              📋
            </button>
          </div>
        </div>

        {/* RGB */}
        <div className={styles.formatGroup}>
          <label className={styles.formatLabel}>RGB</label>
          <div className={styles.rgbInputs}>
            <div className={styles.rgbComponent}>
              <label>R</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbValue.r}
                onChange={(e) => handleRgbChange('r', e.target.value)}
                className={styles.numberInput}
              />
            </div>
            <div className={styles.rgbComponent}>
              <label>G</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbValue.g}
                onChange={(e) => handleRgbChange('g', e.target.value)}
                className={styles.numberInput}
              />
            </div>
            <div className={styles.rgbComponent}>
              <label>B</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbValue.b}
                onChange={(e) => handleRgbChange('b', e.target.value)}
                className={styles.numberInput}
              />
            </div>
            <button 
              onClick={() => copyToClipboard(`rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`, 'RGB')}
              className={styles.copyButton}
            >
              📋
            </button>
          </div>
        </div>

        {/* HSL */}
        <div className={styles.formatGroup}>
          <label className={styles.formatLabel}>HSL</label>
          <div className={styles.hslInputs}>
            <div className={styles.hslComponent}>
              <label>H</label>
              <input
                type="number"
                min="0"
                max="360"
                value={hslValue.h}
                onChange={(e) => handleHslChange('h', e.target.value)}
                className={styles.numberInput}
              />
            </div>
            <div className={styles.hslComponent}>
              <label>S</label>
              <input
                type="number"
                min="0"
                max="100"
                value={hslValue.s}
                onChange={(e) => handleHslChange('s', e.target.value)}
                className={styles.numberInput}
              />
            </div>
            <div className={styles.hslComponent}>
              <label>L</label>
              <input
                type="number"
                min="0"
                max="100"
                value={hslValue.l}
                onChange={(e) => handleHslChange('l', e.target.value)}
                className={styles.numberInput}
              />
            </div>
            <button 
              onClick={() => copyToClipboard(`hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`, 'HSL')}
              className={styles.copyButton}
            >
              📋
            </button>
          </div>
        </div>

        {/* HSV */}
        <div className={styles.formatGroup}>
          <label className={styles.formatLabel}>HSV</label>
          <div className={styles.hsvDisplay}>
            <span>H: {hsvValue.h}°</span>
            <span>S: {hsvValue.s}%</span>
            <span>V: {hsvValue.v}%</span>
            <button 
              onClick={() => copyToClipboard(`hsv(${hsvValue.h}, ${hsvValue.s}%, ${hsvValue.v}%)`, 'HSV')}
              className={styles.copyButton}
            >
              📋
            </button>
          </div>
        </div>

        {/* CMYK */}
        <div className={styles.formatGroup}>
          <label className={styles.formatLabel}>CMYK</label>
          <div className={styles.cmykDisplay}>
            <span>C: {cmykValue.c}%</span>
            <span>M: {cmykValue.m}%</span>
            <span>Y: {cmykValue.y}%</span>
            <span>K: {cmykValue.k}%</span>
            <button 
              onClick={() => copyToClipboard(`cmyk(${cmykValue.c}%, ${cmykValue.m}%, ${cmykValue.y}%, ${cmykValue.k}%)`, 'CMYK')}
              className={styles.copyButton}
            >
              📋
            </button>
          </div>
        </div>
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className={styles.favoritesSection}>
          <h3>Favorite Colors</h3>
          <div className={styles.favoritesGrid}>
            {favorites.map((favorite) => (
              <div key={favorite.id} className={styles.favoriteItem}>
                <div 
                  className={styles.favoriteSwatch}
                  style={{ backgroundColor: favorite.hex }}
                  onClick={() => loadFavorite(favorite)}
                />
                <div className={styles.favoriteInfo}>
                  <div className={styles.favoriteName}>{favorite.name}</div>
                  <div className={styles.favoriteHex}>{favorite.hex}</div>
                </div>
                <button 
                  onClick={() => removeFromFavorites(favorite.id)}
                  className={styles.removeFavorite}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {colorHistory.length > 0 && (
        <div className={styles.historySection}>
          <h3>Recent Colors</h3>
          <div className={styles.historyGrid}>
            {colorHistory.slice(0, 10).map((historyItem) => (
              <div key={historyItem.id} className={styles.historyItem}>
                <div 
                  className={styles.historySwatch}
                  style={{ backgroundColor: historyItem.hex }}
                  onClick={() => loadFromHistory(historyItem)}
                />
                <div className={styles.historyHex}>{historyItem.hex}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Enter a hex color code (with or without #) to convert to other formats</li>
          <li>Adjust RGB or HSL values to fine-tune your color</li>
          <li>Click the 📋 button to copy any color format to clipboard</li>
          <li>Use the 🎲 button to generate random colors</li>
          <li>Save your favorite colors for quick access</li>
          <li>View your recent color history</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorConverterComponent;
