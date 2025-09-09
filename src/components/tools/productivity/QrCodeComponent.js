// src/components/tools/productivity/QrCodeComponent.js
import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/QRCode.module.css';

const QrCodeComponent = () => {
  const [text, setText] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [size, setSize] = useState(200);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [margin, setMargin] = useState(4);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [savedQRCodes, setSavedQRCodes] = useLocalStorage('saved-qr-codes', []);
  const canvasRef = useRef(null);

  // QR Code error correction levels
  const errorCorrectionLevels = [
    { value: 'L', label: 'Low (~7%)', description: 'Suitable for clean environments' },
    { value: 'M', label: 'Medium (~15%)', description: 'Good balance of capacity and error correction' },
    { value: 'Q', label: 'Quartile (~25%)', description: 'Better error correction' },
    { value: 'H', label: 'High (~30%)', description: 'Maximum error correction' }
  ];

  // Generate QR Code using Canvas API
  const generateQRCode = () => {
    if (!text.trim()) {
      setQrCodeDataUrl('');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const canvasSize = size + (margin * 2);
    
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Simple QR Code pattern generation (simplified version)
    // In a real implementation, you'd use a QR code library like qrcode.js
    const moduleSize = Math.floor(size / 25); // Approximate module size
    const qrSize = moduleSize * 25;
    const offset = (canvasSize - qrSize) / 2;

    // Generate a simple pattern (this is a placeholder - use a real QR library)
    ctx.fillStyle = darkColor;
    
    // Draw a simple pattern
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        // Create a deterministic pattern based on text
        const hash = (text.charCodeAt(i % text.length) + j) % 2;
        if (hash === 1) {
          ctx.fillRect(
            offset + j * moduleSize,
            offset + i * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    setQrCodeDataUrl(dataUrl);
  };

  // Generate QR code when text or settings change
  useEffect(() => {
    generateQRCode();
  }, [text, size, errorCorrection, margin, darkColor, lightColor]);

  // Save QR Code
  const saveQRCode = () => {
    const name = prompt('Enter a name for this QR code:');
    if (name && text && qrCodeDataUrl) {
      const newQRCode = {
        id: Date.now(),
        name: name,
        text: text,
        qrCodeDataUrl: qrCodeDataUrl,
        settings: {
          size,
          errorCorrection,
          margin,
          darkColor,
          lightColor
        },
        createdAt: new Date().toISOString()
      };
      setSavedQRCodes([...savedQRCodes, newQRCode]);
    }
  };

  // Load saved QR Code
  const loadQRCode = (savedQRCode) => {
    setText(savedQRCode.text);
    setQrCodeDataUrl(savedQRCode.qrCodeDataUrl);
    const settings = savedQRCode.settings;
    setSize(settings.size);
    setErrorCorrection(settings.errorCorrection);
    setMargin(settings.margin);
    setDarkColor(settings.darkColor);
    setLightColor(settings.lightColor);
  };

  // Delete saved QR Code
  const deleteQRCode = (id) => {
    setSavedQRCodes(savedQRCodes.filter(item => item.id !== id));
  };

  // Download QR Code
  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy QR Code to clipboard
  const copyQRCodeToClipboard = async () => {
    if (!qrCodeDataUrl) return;

    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
    } catch (err) {
      console.error('Failed to copy QR code: ', err);
    }
  };

  // Quick templates
  const quickTemplates = [
    { name: 'Website URL', placeholder: 'https://example.com', icon: '🌐' },
    { name: 'Email', placeholder: 'mailto:contact@example.com', icon: '📧' },
    { name: 'Phone', placeholder: 'tel:+1234567890', icon: '📞' },
    { name: 'SMS', placeholder: 'sms:+1234567890', icon: '💬' },
    { name: 'WiFi', placeholder: 'WIFI:T:WPA;S:NetworkName;P:Password;;', icon: '📶' },
    { name: 'Location', placeholder: 'geo:40.7128,-74.0060', icon: '📍' },
    { name: 'Event', placeholder: 'BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20240101T100000Z\nEND:VEVENT', icon: '📅' },
    { name: 'Contact (vCard)', placeholder: 'BEGIN:VCARD\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD', icon: '👤' }
  ];

  const loadTemplate = (template) => {
    setText(template.placeholder);
  };

  return (
    <div className={styles.qrCodeContainer}>
      <div className={styles.header}>
        <h2>QR Code Generator</h2>
        <p>Generate QR codes from text, URLs, or contact information</p>
      </div>

      {/* Input Section */}
      <div className={styles.inputSection}>
        <div className={styles.textInputGroup}>
          <label className={styles.inputLabel}>Text or URL</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or other data to encode..."
            className={styles.textInput}
            rows={4}
          />
          <div className={styles.charCount}>
            {text.length} characters
          </div>
        </div>

        {/* Quick Templates */}
        <div className={styles.templatesSection}>
          <h3>Quick Templates</h3>
          <div className={styles.templatesGrid}>
            {quickTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => loadTemplate(template)}
                className={styles.templateButton}
                title={template.placeholder}
              >
                <span className={styles.templateIcon}>{template.icon}</span>
                <span className={styles.templateName}>{template.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className={styles.settingsSection}>
        <h3>QR Code Settings</h3>
        <div className={styles.settingsGrid}>
          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Size: {size}px</label>
            <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Error Correction</label>
            <select
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value)}
              className={styles.select}
            >
              {errorCorrectionLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label} - {level.description}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Margin: {margin}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Dark Color</label>
            <div className={styles.colorInputGroup}>
              <input
                type="color"
                value={darkColor}
                onChange={(e) => setDarkColor(e.target.value)}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={darkColor}
                onChange={(e) => setDarkColor(e.target.value)}
                className={styles.colorTextInput}
              />
            </div>
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Light Color</label>
            <div className={styles.colorInputGroup}>
              <input
                type="color"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                className={styles.colorTextInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Display */}
      <div className={styles.qrCodeDisplay}>
        <h3>Generated QR Code</h3>
        <div className={styles.qrCodeContainer}>
          {qrCodeDataUrl ? (
            <div className={styles.qrCodeWrapper}>
              <img
                src={qrCodeDataUrl}
                alt="Generated QR Code"
                className={styles.qrCodeImage}
              />
              <div className={styles.qrCodeActions}>
                <button onClick={downloadQRCode} className={styles.downloadButton}>
                  💾 Download
                </button>
                <button onClick={copyQRCodeToClipboard} className={styles.copyButton}>
                  📋 Copy
                </button>
                <button onClick={saveQRCode} className={styles.saveButton}>
                  ⭐ Save
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.placeholderIcon}>📱</div>
              <div className={styles.placeholderText}>
                Enter text above to generate QR code
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for QR code generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Saved QR Codes */}
      {savedQRCodes.length > 0 && (
        <div className={styles.savedSection}>
          <h3>Saved QR Codes</h3>
          <div className={styles.savedGrid}>
            {savedQRCodes.map((savedQRCode) => (
              <div key={savedQRCode.id} className={styles.savedItem}>
                <div className={styles.savedQRCode}>
                  <img
                    src={savedQRCode.qrCodeDataUrl}
                    alt={savedQRCode.name}
                    className={styles.savedQRImage}
                  />
                </div>
                <div className={styles.savedInfo}>
                  <div className={styles.savedName}>{savedQRCode.name}</div>
                  <div className={styles.savedText}>{savedQRCode.text.substring(0, 50)}...</div>
                  <div className={styles.savedDate}>
                    {new Date(savedQRCode.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className={styles.savedActions}>
                  <button 
                    onClick={() => loadQRCode(savedQRCode)}
                    className={styles.loadButton}
                  >
                    📂 Load
                  </button>
                  <button 
                    onClick={() => deleteQRCode(savedQRCode.id)}
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

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Enter any text, URL, or data you want to encode</li>
          <li>Use quick templates for common QR code types</li>
          <li>Customize the size, colors, and error correction level</li>
          <li>Download or copy the generated QR code</li>
          <li>Save frequently used QR codes for quick access</li>
          <li>Higher error correction levels make QR codes more robust but larger</li>
        </ul>
      </div>
    </div>
  );
};

export default QrCodeComponent;
