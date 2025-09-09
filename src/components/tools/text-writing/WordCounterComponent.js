// src/components/tools/text-writing/WordCounterComponent.js
import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/WordCounter.module.css';

const WordCounterComponent = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedTexts, setSavedTexts] = useLocalStorage('saved-texts', []);
  const [currentTextName, setCurrentTextName] = useState('');
  const textareaRef = useRef(null);

  // Calculate statistics
  const calculateStats = (inputText) => {
    if (!inputText.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0
      };
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = inputText.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    
    // Reading time calculation (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Speaking time calculation (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    };
  };

  // Update stats when text changes
  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  // Handle text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Clear text
  const clearText = () => {
    setText('');
    setCurrentTextName('');
    textareaRef.current?.focus();
  };

  // Save text
  const saveText = () => {
    if (!text.trim() || !currentTextName.trim()) return;
    
    const newSavedText = {
      id: Date.now(),
      name: currentTextName,
      text: text,
      stats: stats,
      createdAt: new Date().toISOString()
    };
    
    setSavedTexts([...savedTexts, newSavedText]);
    setCurrentTextName('');
  };

  // Load saved text
  const loadSavedText = (savedText) => {
    setText(savedText.text);
    setCurrentTextName(savedText.name);
  };

  // Delete saved text
  const deleteSavedText = (id) => {
    setSavedTexts(savedTexts.filter(item => item.id !== id));
  };

  // Copy text to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Download as text file
  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  return (
    <div className={styles.wordCounterContainer}>
      <div className={styles.header}>
        <h2>Word Counter</h2>
        <p>Count words, characters, sentences, and paragraphs in your text</p>
      </div>

      {/* Statistics Display */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.words}</div>
          <div className={styles.statLabel}>Words</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.characters}</div>
          <div className={styles.statLabel}>Characters</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.charactersNoSpaces}</div>
          <div className={styles.statLabel}>Characters (no spaces)</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.sentences}</div>
          <div className={styles.statLabel}>Sentences</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.paragraphs}</div>
          <div className={styles.statLabel}>Paragraphs</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.readingTime}</div>
          <div className={styles.statLabel}>Reading Time (min)</div>
        </div>
      </div>

      {/* Text Input Area */}
      <div className={styles.textAreaContainer}>
        <div className={styles.textAreaHeader}>
          <h3>Your Text</h3>
          <div className={styles.textActions}>
            <button onClick={copyToClipboard} className={styles.actionButton}>
              📋 Copy
            </button>
            <button onClick={downloadText} className={styles.actionButton}>
              💾 Download
            </button>
            <button onClick={clearText} className={styles.actionButton}>
              🗑️ Clear
            </button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing your text here..."
          className={styles.textArea}
          rows={10}
        />
        <div className={styles.textAreaFooter}>
          <span className={styles.charCount}>
            {stats.characters} characters
          </span>
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={styles.toggleButton}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Stats
          </button>
        </div>
      </div>

      {/* Advanced Statistics */}
      {showAdvanced && (
        <div className={styles.advancedStats}>
          <h3>Advanced Statistics</h3>
          <div className={styles.advancedGrid}>
            <div className={styles.advancedItem}>
              <span className={styles.advancedLabel}>Average words per sentence:</span>
              <span className={styles.advancedValue}>
                {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : '0'}
              </span>
            </div>
            <div className={styles.advancedItem}>
              <span className={styles.advancedLabel}>Average characters per word:</span>
              <span className={styles.advancedValue}>
                {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : '0'}
              </span>
            </div>
            <div className={styles.advancedItem}>
              <span className={styles.advancedLabel}>Speaking time:</span>
              <span className={styles.advancedValue}>{stats.speakingTime} minutes</span>
            </div>
            <div className={styles.advancedItem}>
              <span className={styles.advancedLabel}>Text density:</span>
              <span className={styles.advancedValue}>
                {stats.characters > 0 ? ((stats.charactersNoSpaces / stats.characters) * 100).toFixed(1) : '0'}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Save/Load Section */}
      <div className={styles.saveSection}>
        <h3>Save & Load Text</h3>
        <div className={styles.saveControls}>
          <input
            type="text"
            value={currentTextName}
            onChange={(e) => setCurrentTextName(e.target.value)}
            placeholder="Enter a name for this text..."
            className={styles.saveInput}
          />
          <button 
            onClick={saveText} 
            disabled={!text.trim() || !currentTextName.trim()}
            className={styles.saveButton}
          >
            💾 Save Text
          </button>
        </div>

        {savedTexts.length > 0 && (
          <div className={styles.savedTexts}>
            <h4>Saved Texts</h4>
            <div className={styles.savedTextsList}>
              {savedTexts.map((savedText) => (
                <div key={savedText.id} className={styles.savedTextItem}>
                  <div className={styles.savedTextInfo}>
                    <div className={styles.savedTextName}>{savedText.name}</div>
                    <div className={styles.savedTextMeta}>
                      {savedText.stats.words} words • {new Date(savedText.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={styles.savedTextActions}>
                    <button 
                      onClick={() => loadSavedText(savedText)}
                      className={styles.loadButton}
                    >
                      📂 Load
                    </button>
                    <button 
                      onClick={() => deleteSavedText(savedText.id)}
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
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Type or paste your text in the text area above</li>
          <li>View real-time statistics including word count, character count, and more</li>
          <li>Use advanced stats to analyze your writing patterns</li>
          <li>Save frequently used texts for quick access</li>
          <li>Copy or download your text for external use</li>
        </ul>
      </div>
    </div>
  );
};

export default WordCounterComponent;
