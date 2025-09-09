// src/components/tools/networking-it/PasswordGeneratorComponent.js
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/PasswordGenerator.module.css';

const PasswordGeneratorComponent = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [customChars, setCustomChars] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });
  const [savedPasswords, setSavedPasswords] = useLocalStorage('saved-passwords', []);

  // Character sets
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'il1Lo0O',
    ambiguous: '{}[]()/\\\'"`~,;.<>'
  };

  // Generate password
  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (includeUppercase) charset += charSets.uppercase;
    if (includeLowercase) charset += charSets.lowercase;
    if (includeNumbers) charset += charSets.numbers;
    if (includeSymbols) charset += charSets.symbols;
    if (customChars) charset += customChars;

    // Remove similar characters if requested
    if (excludeSimilar) {
      charset = charset.split('').filter(char => !charSets.similar.includes(char)).join('');
    }

    // Remove ambiguous characters if requested
    if (excludeAmbiguous) {
      charset = charset.split('').filter(char => !charSets.ambiguous.includes(char)).join('');
    }

    if (charset.length === 0) {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    setPassword(newPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous, customChars]);

  // Calculate password strength
  const calculateStrength = useCallback((pwd) => {
    if (!pwd) return { score: 0, label: 'No Password', color: '#ef4444' };

    let score = 0;
    let feedback = [];

    // Length scoring
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    // Character variety scoring
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    // Additional complexity
    if (pwd.length >= 20) score += 1;
    if ((pwd.match(/[^a-zA-Z0-9]/g) || []).length >= 3) score += 1;

    // Determine strength level
    let label, color;
    if (score <= 2) {
      label = 'Weak';
      color = '#ef4444';
    } else if (score <= 4) {
      label = 'Fair';
      color = '#f59e0b';
    } else if (score <= 6) {
      label = 'Good';
      color = '#10b981';
    } else {
      label = 'Strong';
      color = '#059669';
    }

    return { score, label, color };
  }, []);

  // Generate password on component mount and when settings change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Update strength when password changes
  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password, calculateStrength]);

  // Copy password to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  };

  // Save password
  const savePassword = () => {
    const name = prompt('Enter a name for this password:');
    if (name && password) {
      const newPassword = {
        id: Date.now(),
        name: name,
        password: password,
        settings: {
          length,
          includeUppercase,
          includeLowercase,
          includeNumbers,
          includeSymbols,
          excludeSimilar,
          excludeAmbiguous,
          customChars
        },
        createdAt: new Date().toISOString()
      };
      setSavedPasswords([...savedPasswords, newPassword]);
    }
  };

  // Load saved password
  const loadPassword = (savedPassword) => {
    setPassword(savedPassword.password);
    const settings = savedPassword.settings;
    setLength(settings.length);
    setIncludeUppercase(settings.includeUppercase);
    setIncludeLowercase(settings.includeLowercase);
    setIncludeNumbers(settings.includeNumbers);
    setIncludeSymbols(settings.includeSymbols);
    setExcludeSimilar(settings.excludeSimilar);
    setExcludeAmbiguous(settings.excludeAmbiguous);
    setCustomChars(settings.customChars);
  };

  // Delete saved password
  const deletePassword = (id) => {
    setSavedPasswords(savedPasswords.filter(item => item.id !== id));
  };

  return (
    <div className={styles.passwordGeneratorContainer}>
      <div className={styles.header}>
        <h2>Password Generator</h2>
        <p>Create strong, secure passwords with customizable options</p>
      </div>

      {/* Generated Password Display */}
      <div className={styles.passwordDisplay}>
        <div className={styles.passwordContainer}>
          <input
            type="text"
            value={password}
            readOnly
            className={styles.passwordInput}
            placeholder="Your generated password will appear here..."
          />
          <button onClick={copyToClipboard} className={styles.copyButton}>
            📋 Copy
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        <div className={styles.strengthIndicator}>
          <div className={styles.strengthLabel}>Password Strength:</div>
          <div className={styles.strengthBar}>
            <div 
              className={styles.strengthFill}
              style={{ 
                width: `${(strength.score / 8) * 100}%`,
                backgroundColor: strength.color 
              }}
            />
          </div>
          <div 
            className={styles.strengthText}
            style={{ color: strength.color }}
          >
            {strength.label}
          </div>
        </div>
      </div>

      {/* Password Settings */}
      <div className={styles.settingsSection}>
        <h3>Password Settings</h3>
        
        {/* Length Setting */}
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>
            Password Length: {length} characters
          </label>
          <input
            type="range"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className={styles.lengthSlider}
          />
          <div className={styles.lengthLabels}>
            <span>4</span>
            <span>128</span>
          </div>
        </div>

        {/* Character Type Settings */}
        <div className={styles.characterSettings}>
          <h4>Include Characters</h4>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span>Uppercase Letters (A-Z)</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span>Lowercase Letters (a-z)</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <span>Symbols (!@#$%^&*)</span>
            </label>
          </div>
        </div>

        {/* Exclusion Settings */}
        <div className={styles.exclusionSettings}>
          <h4>Exclude Characters</h4>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
              />
              <span>Similar Characters (il1Lo0O)</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              />
              <span>Ambiguous Characters ({ } [ ] ( ) / \ ' " ` ~ , ; . < >)</span>
            </label>
          </div>
        </div>

        {/* Custom Characters */}
        <div className={styles.customCharsSection}>
          <label className={styles.settingLabel}>
            Custom Characters (optional)
          </label>
          <input
            type="text"
            value={customChars}
            onChange={(e) => setCustomChars(e.target.value)}
            placeholder="Add any additional characters..."
            className={styles.customCharsInput}
          />
          <div className={styles.customCharsHelp}>
            Add any additional characters you want to include in your password
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button onClick={generatePassword} className={styles.generateButton}>
            🔄 Generate New Password
          </button>
          <button onClick={savePassword} className={styles.saveButton}>
            💾 Save Password
          </button>
        </div>
      </div>

      {/* Saved Passwords */}
      {savedPasswords.length > 0 && (
        <div className={styles.savedPasswordsSection}>
          <h3>Saved Passwords</h3>
          <div className={styles.savedPasswordsList}>
            {savedPasswords.map((savedPassword) => (
              <div key={savedPassword.id} className={styles.savedPasswordItem}>
                <div className={styles.savedPasswordInfo}>
                  <div className={styles.savedPasswordName}>{savedPassword.name}</div>
                  <div className={styles.savedPasswordMeta}>
                    {savedPassword.settings.length} chars • {new Date(savedPassword.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className={styles.savedPasswordActions}>
                  <button 
                    onClick={() => loadPassword(savedPassword)}
                    className={styles.loadButton}
                  >
                    📂 Load
                  </button>
                  <button 
                    onClick={() => deletePassword(savedPassword.id)}
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

      {/* Security Tips */}
      <div className={styles.securityTips}>
        <h3>Security Tips</h3>
        <ul>
          <li>Use passwords that are at least 12 characters long</li>
          <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
          <li>Don't reuse passwords across different accounts</li>
          <li>Consider using a password manager for better security</li>
          <li>Enable two-factor authentication when available</li>
          <li>Change passwords regularly, especially for sensitive accounts</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordGeneratorComponent;
