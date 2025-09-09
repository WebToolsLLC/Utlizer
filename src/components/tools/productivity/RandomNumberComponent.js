// src/components/tools/productivity/RandomNumberComponent.js
import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/RandomNumber.module.css';

const RandomNumberComponent = () => {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [sortResults, setSortResults] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [history, setHistory] = useLocalStorage('random-number-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-number-favorites', []);
  const intervalRef = useRef(null);

  // Generate random numbers
  const generateNumbers = () => {
    if (minValue >= maxValue) {
      alert('Minimum value must be less than maximum value');
      return;
    }

    const numbers = [];
    const usedNumbers = new Set();

    for (let i = 0; i < count; i++) {
      let randomNum;
      
      if (allowDuplicates) {
        randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      } else {
        // Generate unique numbers
        if (usedNumbers.size >= (maxValue - minValue + 1)) {
          alert('Cannot generate more unique numbers than the range allows');
          return;
        }
        
        do {
          randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        } while (usedNumbers.has(randomNum));
        
        usedNumbers.add(randomNum);
      }
      
      numbers.push(randomNum);
    }

    if (sortResults) {
      numbers.sort((a, b) => a - b);
    }

    setGeneratedNumbers(numbers);
    
    // Add to history
    const historyItem = {
      id: Date.now(),
      numbers: [...numbers],
      settings: {
        minValue,
        maxValue,
        count,
        allowDuplicates,
        sortResults
      },
      timestamp: new Date().toISOString()
    };
    
    setHistory([historyItem, ...history.slice(0, 19)]); // Keep last 20
  };

  // Auto-generate with interval
  const startAutoGenerate = () => {
    if (intervalRef.current) return;
    
    intervalRef.current = setInterval(() => {
      generateNumbers();
    }, 1000);
  };

  const stopAutoGenerate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Save current settings as favorite
  const saveAsFavorite = () => {
    const name = prompt('Enter a name for this configuration:');
    if (name) {
      const favorite = {
        id: Date.now(),
        name: name,
        settings: {
          minValue,
          maxValue,
          count,
          allowDuplicates,
          sortResults
        },
        createdAt: new Date().toISOString()
      };
      setFavorites([...favorites, favorite]);
    }
  };

  // Load favorite settings
  const loadFavorite = (favorite) => {
    const settings = favorite.settings;
    setMinValue(settings.minValue);
    setMaxValue(settings.maxValue);
    setCount(settings.count);
    setAllowDuplicates(settings.allowDuplicates);
    setSortResults(settings.sortResults);
  };

  // Delete favorite
  const deleteFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  // Copy numbers to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedNumbers.join(', '));
    } catch (err) {
      console.error('Failed to copy numbers: ', err);
    }
  };

  // Download numbers as text file
  const downloadNumbers = () => {
    const content = `Random Numbers Generated\nGenerated: ${new Date().toLocaleString()}\nRange: ${minValue} - ${maxValue}\nCount: ${count}\nAllow Duplicates: ${allowDuplicates ? 'Yes' : 'No'}\nSorted: ${sortResults ? 'Yes' : 'No'}\n\nNumbers:\n${generatedNumbers.join(', ')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `random-numbers-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Quick presets
  const quickPresets = [
    { name: 'Dice Roll', min: 1, max: 6, count: 1 },
    { name: 'Lottery (1-49)', min: 1, max: 49, count: 6, allowDuplicates: false },
    { name: 'Coin Flip', min: 1, max: 2, count: 1 },
    { name: 'Percent (0-100)', min: 0, max: 100, count: 1 },
    { name: 'Year Range', min: 1900, max: 2024, count: 1 },
    { name: 'Temperature', min: -50, max: 50, count: 1 },
    { name: 'Multiple Dice', min: 1, max: 6, count: 5 },
    { name: 'Random List', min: 1, max: 100, count: 10, allowDuplicates: false, sortResults: true }
  ];

  const loadPreset = (preset) => {
    setMinValue(preset.min);
    setMaxValue(preset.max);
    setCount(preset.count);
    if (preset.allowDuplicates !== undefined) setAllowDuplicates(preset.allowDuplicates);
    if (preset.sortResults !== undefined) setSortResults(preset.sortResults);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.randomNumberContainer}>
      <div className={styles.header}>
        <h2>Random Number Generator</h2>
        <p>Generate random numbers for lotteries, contests, or statistical purposes</p>
      </div>

      {/* Settings */}
      <div className={styles.settingsSection}>
        <div className={styles.settingsGrid}>
          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Minimum Value</label>
            <input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(parseInt(e.target.value) || 0)}
              className={styles.numberInput}
            />
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Maximum Value</label>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(parseInt(e.target.value) || 100)}
              className={styles.numberInput}
            />
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Count</label>
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.numberInput}
            />
          </div>
        </div>

        <div className={styles.optionsSection}>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
              />
              <span>Allow Duplicates</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={sortResults}
                onChange={(e) => setSortResults(e.target.checked)}
              />
              <span>Sort Results</span>
            </label>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className={styles.presetsSection}>
        <h3>Quick Presets</h3>
        <div className={styles.presetsGrid}>
          {quickPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => loadPreset(preset)}
              className={styles.presetButton}
            >
              <div className={styles.presetName}>{preset.name}</div>
              <div className={styles.presetRange}>
                {preset.min} - {preset.max} ({preset.count} number{preset.count > 1 ? 's' : ''})
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Buttons */}
      <div className={styles.generateSection}>
        <div className={styles.generateButtons}>
          <button onClick={generateNumbers} className={styles.generateButton}>
            🎲 Generate Numbers
          </button>
          <button 
            onClick={intervalRef.current ? stopAutoGenerate : startAutoGenerate}
            className={styles.autoButton}
          >
            {intervalRef.current ? '⏹️ Stop Auto' : '🔄 Auto Generate'}
          </button>
        </div>
        
        {intervalRef.current && (
          <div className={styles.autoIndicator}>
            <span className={styles.autoDot}></span>
            Auto-generating every second
          </div>
        )}
      </div>

      {/* Results Display */}
      <div className={styles.resultsSection}>
        <h3>Generated Numbers</h3>
        {generatedNumbers.length > 0 ? (
          <div className={styles.resultsContainer}>
            <div className={styles.numbersDisplay}>
              {generatedNumbers.map((number, index) => (
                <span key={index} className={styles.numberBadge}>
                  {number}
                </span>
              ))}
            </div>
            
            <div className={styles.resultsStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Count:</span>
                <span className={styles.statValue}>{generatedNumbers.length}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Min:</span>
                <span className={styles.statValue}>{Math.min(...generatedNumbers)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Max:</span>
                <span className={styles.statValue}>{Math.max(...generatedNumbers)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Sum:</span>
                <span className={styles.statValue}>{generatedNumbers.reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Average:</span>
                <span className={styles.statValue}>
                  {(generatedNumbers.reduce((a, b) => a + b, 0) / generatedNumbers.length).toFixed(2)}
                </span>
              </div>
            </div>

            <div className={styles.resultsActions}>
              <button onClick={copyToClipboard} className={styles.copyButton}>
                📋 Copy
              </button>
              <button onClick={downloadNumbers} className={styles.downloadButton}>
                💾 Download
              </button>
              <button onClick={saveAsFavorite} className={styles.saveButton}>
                ⭐ Save Settings
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>🎲</div>
            <div className={styles.placeholderText}>
              Click "Generate Numbers" to create random numbers
            </div>
          </div>
        )}
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className={styles.favoritesSection}>
          <h3>Saved Configurations</h3>
          <div className={styles.favoritesGrid}>
            {favorites.map((favorite) => (
              <div key={favorite.id} className={styles.favoriteItem}>
                <div className={styles.favoriteInfo}>
                  <div className={styles.favoriteName}>{favorite.name}</div>
                  <div className={styles.favoriteSettings}>
                    Range: {favorite.settings.minValue} - {favorite.settings.maxValue} | 
                    Count: {favorite.settings.count} | 
                    Duplicates: {favorite.settings.allowDuplicates ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className={styles.favoriteActions}>
                  <button 
                    onClick={() => loadFavorite(favorite)}
                    className={styles.loadButton}
                  >
                    📂 Load
                  </button>
                  <button 
                    onClick={() => deleteFavorite(favorite.id)}
                    className={styles.deleteButton}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className={styles.historySection}>
          <h3>Recent Generations</h3>
          <div className={styles.historyList}>
            {history.slice(0, 5).map((historyItem) => (
              <div key={historyItem.id} className={styles.historyItem}>
                <div className={styles.historyInfo}>
                  <div className={styles.historyNumbers}>
                    {historyItem.numbers.slice(0, 10).join(', ')}
                    {historyItem.numbers.length > 10 && '...'}
                  </div>
                  <div className={styles.historyMeta}>
                    {historyItem.settings.minValue} - {historyItem.settings.maxValue} | 
                    {new Date(historyItem.timestamp).toLocaleString()}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setMinValue(historyItem.settings.minValue);
                    setMaxValue(historyItem.settings.maxValue);
                    setCount(historyItem.settings.count);
                    setAllowDuplicates(historyItem.settings.allowDuplicates);
                    setSortResults(historyItem.settings.sortResults);
                    setGeneratedNumbers(historyItem.numbers);
                  }}
                  className={styles.loadHistoryButton}
                >
                  📂 Load
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Set the minimum and maximum values for your range</li>
          <li>Choose how many numbers to generate</li>
          <li>Enable "Allow Duplicates" to permit repeated numbers</li>
          <li>Enable "Sort Results" to arrange numbers in ascending order</li>
          <li>Use quick presets for common scenarios like dice rolls or lotteries</li>
          <li>Save frequently used configurations for quick access</li>
          <li>Use auto-generate for continuous random number generation</li>
        </ul>
      </div>
    </div>
  );
};

export default RandomNumberComponent;
