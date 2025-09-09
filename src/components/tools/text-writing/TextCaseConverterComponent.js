// src/components/tools/text-writing/TextCaseConverterComponent.js
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/TextCaseConverter.module.css';

const TextCaseConverterComponent = () => {
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [conversionType, setConversionType] = useState('uppercase');
  const [savedTexts, setSavedTexts] = useLocalStorage('saved-case-texts', []);

  // Conversion types
  const conversionTypes = [
    { value: 'uppercase', label: 'UPPERCASE', description: 'Convert to all uppercase letters' },
    { value: 'lowercase', label: 'lowercase', description: 'Convert to all lowercase letters' },
    { value: 'titlecase', label: 'Title Case', description: 'Convert to title case (first letter of each word capitalized)' },
    { value: 'camelcase', label: 'camelCase', description: 'Convert to camelCase (first word lowercase, others capitalized)' },
    { value: 'pascalcase', label: 'PascalCase', description: 'Convert to PascalCase (first letter of each word capitalized)' },
    { value: 'snakecase', label: 'snake_case', description: 'Convert to snake_case (words separated by underscores)' },
    { value: 'kebabcase', label: 'kebab-case', description: 'Convert to kebab-case (words separated by hyphens)' },
    { value: 'constantcase', label: 'CONSTANT_CASE', description: 'Convert to CONSTANT_CASE (uppercase with underscores)' },
    { value: 'dotcase', label: 'dot.case', description: 'Convert to dot.case (words separated by dots)' },
    { value: 'pathcase', label: 'path/case', description: 'Convert to path/case (words separated by slashes)' },
    { value: 'sentencecase', label: 'Sentence case', description: 'Convert to sentence case (first letter capitalized)' },
    { value: 'alternating', label: 'aLtErNaTiNg', description: 'Convert to alternating case' },
    { value: 'inverse', label: 'iNvErSe', description: 'Convert to inverse case' },
    { value: 'reverse', label: 'esreveR', description: 'Reverse the text' }
  ];

  // Convert text based on selected type
  const convertText = (text, type) => {
    if (!text.trim()) return '';

    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      
      case 'lowercase':
        return text.toLowerCase();
      
      case 'titlecase':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      
      case 'camelcase':
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, '');
      
      case 'pascalcase':
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, '');
      
      case 'snakecase':
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('_');
      
      case 'kebabcase':
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('-');
      
      case 'constantcase':
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toUpperCase())
          .join('_');
      
      case 'dotcase':
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('.');
      
      case 'pathcase':
        return text
          .replace(/\W+/g, ' ')
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join('/');
      
      case 'sentencecase':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      
      case 'alternating':
        return text
          .split('')
          .map((char, index) => 
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join('');
      
      case 'inverse':
        return text
          .split('')
          .map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join('');
      
      case 'reverse':
        return text.split('').reverse().join('');
      
      default:
        return text;
    }
  };

  // Update converted text when input or conversion type changes
  useEffect(() => {
    setConvertedText(convertText(inputText, conversionType));
  }, [inputText, conversionType]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle conversion type change
  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
  };

  // Copy converted text to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Copy input text to clipboard
  const copyInputToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Save text
  const saveText = () => {
    const name = prompt('Enter a name for this text:');
    if (name && inputText) {
      const newText = {
        id: Date.now(),
        name: name,
        originalText: inputText,
        convertedText: convertedText,
        conversionType: conversionType,
        createdAt: new Date().toISOString()
      };
      setSavedTexts([...savedTexts, newText]);
    }
  };

  // Load saved text
  const loadSavedText = (savedText) => {
    setInputText(savedText.originalText);
    setConversionType(savedText.conversionType);
  };

  // Delete saved text
  const deleteSavedText = (id) => {
    setSavedTexts(savedTexts.filter(item => item.id !== id));
  };

  // Clear all text
  const clearText = () => {
    setInputText('');
    setConvertedText('');
  };

  // Download as text file
  const downloadText = () => {
    const content = `Original Text:\n${inputText}\n\nConverted Text (${conversionTypes.find(t => t.value === conversionType)?.label}):\n${convertedText}\n\nGenerated: ${new Date().toLocaleString()}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-case-conversion-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Quick examples
  const quickExamples = [
    { text: 'hello world', label: 'Hello World' },
    { text: 'JavaScript is awesome', label: 'JavaScript Example' },
    { text: 'user_name_field', label: 'Snake Case' },
    { text: 'firstName', label: 'Camel Case' },
    { text: 'API_KEY_VALUE', label: 'Constant Case' }
  ];

  const loadExample = (example) => {
    setInputText(example.text);
  };

  return (
    <div className={styles.textCaseConverterContainer}>
      <div className={styles.header}>
        <h2>Text Case Converter</h2>
        <p>Convert text between different cases and formats</p>
      </div>

      {/* Conversion Type Selection */}
      <div className={styles.conversionTypeSection}>
        <h3>Select Conversion Type</h3>
        <div className={styles.conversionTypeGrid}>
          {conversionTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setConversionType(type.value)}
              className={`${styles.conversionTypeButton} ${conversionType === type.value ? styles.active : ''}`}
              title={type.description}
            >
              <div className={styles.conversionTypeLabel}>{type.label}</div>
              <div className={styles.conversionTypeDescription}>{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Input and Output */}
      <div className={styles.textSection}>
        <div className={styles.inputGroup}>
          <div className={styles.inputHeader}>
            <label className={styles.inputLabel}>Original Text</label>
            <button onClick={copyInputToClipboard} className={styles.copyButton}>
              📋 Copy
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your text here..."
            className={styles.textInput}
            rows={6}
          />
          <div className={styles.charCount}>
            {inputText.length} characters
          </div>
        </div>

        <div className={styles.outputGroup}>
          <div className={styles.outputHeader}>
            <label className={styles.outputLabel}>
              Converted Text ({conversionTypes.find(t => t.value === conversionType)?.label})
            </label>
            <button onClick={copyToClipboard} className={styles.copyButton}>
              📋 Copy
            </button>
          </div>
          <textarea
            value={convertedText}
            readOnly
            className={styles.textOutput}
            rows={6}
            placeholder="Converted text will appear here..."
          />
          <div className={styles.charCount}>
            {convertedText.length} characters
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className={styles.examplesSection}>
        <h3>Quick Examples</h3>
        <div className={styles.examplesGrid}>
          {quickExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example)}
              className={styles.exampleButton}
            >
              <div className={styles.exampleText}>{example.text}</div>
              <div className={styles.exampleLabel}>{example.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button onClick={clearText} className={styles.clearButton}>
          🗑️ Clear All
        </button>
        <button onClick={downloadText} className={styles.downloadButton}>
          💾 Download
        </button>
        <button onClick={saveText} className={styles.saveButton}>
          ⭐ Save Text
        </button>
      </div>

      {/* Saved Texts */}
      {savedTexts.length > 0 && (
        <div className={styles.savedSection}>
          <h3>Saved Texts</h3>
          <div className={styles.savedTextsList}>
            {savedTexts.map((savedText) => (
              <div key={savedText.id} className={styles.savedTextItem}>
                <div className={styles.savedTextInfo}>
                  <div className={styles.savedTextName}>{savedText.name}</div>
                  <div className={styles.savedTextPreview}>
                    Original: {savedText.originalText.substring(0, 50)}...
                  </div>
                  <div className={styles.savedTextMeta}>
                    Type: {conversionTypes.find(t => t.value === savedText.conversionType)?.label} | 
                    {new Date(savedText.createdAt).toLocaleDateString()}
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

      {/* Case Information */}
      <div className={styles.caseInfoSection}>
        <h3>Case Types Explained</h3>
        <div className={styles.caseInfoGrid}>
          <div className={styles.caseInfoItem}>
            <h4>UPPERCASE</h4>
            <p>All letters are capitalized. Used for emphasis or headers.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>lowercase</h4>
            <p>All letters are in small case. Used for normal text.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>Title Case</h4>
            <p>First letter of each word is capitalized. Used for titles.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>camelCase</h4>
            <p>First word lowercase, others capitalized. Used in programming.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>PascalCase</h4>
            <p>First letter of each word capitalized. Used for class names.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>snake_case</h4>
            <p>Words separated by underscores. Used in Python and databases.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>kebab-case</h4>
            <p>Words separated by hyphens. Used in URLs and CSS.</p>
          </div>
          <div className={styles.caseInfoItem}>
            <h4>CONSTANT_CASE</h4>
            <p>Uppercase with underscores. Used for constants.</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Enter your text in the input area</li>
          <li>Select the desired conversion type from the options above</li>
          <li>View the converted text in the output area</li>
          <li>Copy the converted text to clipboard or download as file</li>
          <li>Save frequently used texts for quick access</li>
          <li>Try the quick examples to see different case conversions</li>
        </ul>
      </div>
    </div>
  );
};

export default TextCaseConverterComponent;
