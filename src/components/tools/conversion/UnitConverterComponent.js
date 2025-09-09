// src/components/tools/conversion/UnitConverterComponent.js
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/UnitConverter.module.css';

const UnitConverterComponent = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [history, setHistory] = useLocalStorage('unit-converter-history', []);

  // Unit conversion data
  const conversionData = {
    length: {
      name: 'Length',
      units: {
        'mm': { name: 'Millimeter', factor: 0.001 },
        'cm': { name: 'Centimeter', factor: 0.01 },
        'm': { name: 'Meter', factor: 1 },
        'km': { name: 'Kilometer', factor: 1000 },
        'in': { name: 'Inch', factor: 0.0254 },
        'ft': { name: 'Foot', factor: 0.3048 },
        'yd': { name: 'Yard', factor: 0.9144 },
        'mi': { name: 'Mile', factor: 1609.344 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        'mg': { name: 'Milligram', factor: 0.001 },
        'g': { name: 'Gram', factor: 1 },
        'kg': { name: 'Kilogram', factor: 1000 },
        'oz': { name: 'Ounce', factor: 28.3495 },
        'lb': { name: 'Pound', factor: 453.592 },
        'ton': { name: 'Metric Ton', factor: 1000000 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        'c': { name: 'Celsius', factor: 1 },
        'f': { name: 'Fahrenheit', factor: 1 },
        'k': { name: 'Kelvin', factor: 1 }
      }
    },
    area: {
      name: 'Area',
      units: {
        'mm²': { name: 'Square Millimeter', factor: 0.000001 },
        'cm²': { name: 'Square Centimeter', factor: 0.0001 },
        'm²': { name: 'Square Meter', factor: 1 },
        'km²': { name: 'Square Kilometer', factor: 1000000 },
        'in²': { name: 'Square Inch', factor: 0.00064516 },
        'ft²': { name: 'Square Foot', factor: 0.092903 },
        'yd²': { name: 'Square Yard', factor: 0.836127 },
        'acre': { name: 'Acre', factor: 4046.86 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        'ml': { name: 'Milliliter', factor: 0.001 },
        'l': { name: 'Liter', factor: 1 },
        'm³': { name: 'Cubic Meter', factor: 1000 },
        'fl oz': { name: 'Fluid Ounce', factor: 0.0295735 },
        'cup': { name: 'Cup', factor: 0.236588 },
        'pt': { name: 'Pint', factor: 0.473176 },
        'qt': { name: 'Quart', factor: 0.946353 },
        'gal': { name: 'Gallon', factor: 3.78541 }
      }
    },
    time: {
      name: 'Time',
      units: {
        'ms': { name: 'Millisecond', factor: 0.001 },
        's': { name: 'Second', factor: 1 },
        'min': { name: 'Minute', factor: 60 },
        'h': { name: 'Hour', factor: 3600 },
        'day': { name: 'Day', factor: 86400 },
        'week': { name: 'Week', factor: 604800 },
        'month': { name: 'Month', factor: 2629746 },
        'year': { name: 'Year', factor: 31556952 }
      }
    },
    speed: {
      name: 'Speed',
      units: {
        'm/s': { name: 'Meter per Second', factor: 1 },
        'km/h': { name: 'Kilometer per Hour', factor: 0.277778 },
        'mph': { name: 'Mile per Hour', factor: 0.44704 },
        'ft/s': { name: 'Foot per Second', factor: 0.3048 },
        'knot': { name: 'Knot', factor: 0.514444 }
      }
    },
    pressure: {
      name: 'Pressure',
      units: {
        'pa': { name: 'Pascal', factor: 1 },
        'kpa': { name: 'Kilopascal', factor: 1000 },
        'bar': { name: 'Bar', factor: 100000 },
        'psi': { name: 'Pound per Square Inch', factor: 6894.76 },
        'atm': { name: 'Atmosphere', factor: 101325 }
      }
    }
  };

  // Temperature conversion (special case)
  const convertTemperature = (value, from, to) => {
    let celsius;
    
    // Convert to Celsius first
    switch (from) {
      case 'c':
        celsius = value;
        break;
      case 'f':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      default:
        return value;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'c':
        return celsius;
      case 'f':
        return celsius * 9 / 5 + 32;
      case 'k':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  // Convert units
  const convertUnits = (value, from, to, category) => {
    if (!value || !from || !to || from === to) return value;
    
    if (category === 'temperature') {
      return convertTemperature(parseFloat(value), from, to);
    }
    
    const fromFactor = conversionData[category].units[from]?.factor;
    const toFactor = conversionData[category].units[to]?.factor;
    
    if (!fromFactor || !toFactor) return value;
    
    // Convert to base unit, then to target unit
    const baseValue = parseFloat(value) * fromFactor;
    return baseValue / toFactor;
  };

  // Update conversion when values change
  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      const converted = convertUnits(fromValue, fromUnit, toUnit, category);
      setToValue(converted.toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit, category]);

  // Reset units when category changes
  useEffect(() => {
    const units = Object.keys(conversionData[category].units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || '');
    setFromValue('');
    setToValue('');
  }, [category]);

  // Swap units
  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    setToValue(tempValue);
  };

  // Save to history
  const saveToHistory = () => {
    if (!fromValue || !fromUnit || !toUnit) return;
    
    const historyItem = {
      id: Date.now(),
      category: category,
      fromValue: fromValue,
      fromUnit: fromUnit,
      toValue: toValue,
      toUnit: toUnit,
      timestamp: new Date().toISOString()
    };
    
    setHistory([historyItem, ...history.slice(0, 19)]); // Keep last 20
  };

  // Load from history
  const loadFromHistory = (historyItem) => {
    setCategory(historyItem.category);
    setFromValue(historyItem.fromValue);
    setFromUnit(historyItem.fromUnit);
    setToUnit(historyItem.toUnit);
  };

  // Delete from history
  const deleteFromHistory = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  // Clear all data
  const clearData = () => {
    setFromValue('');
    setToValue('');
  };

  // Quick conversions
  const quickConversions = {
    length: [
      { from: '1', fromUnit: 'm', toUnit: 'ft', label: '1 meter = ? feet' },
      { from: '1', fromUnit: 'km', toUnit: 'mi', label: '1 kilometer = ? miles' },
      { from: '1', fromUnit: 'in', toUnit: 'cm', label: '1 inch = ? centimeters' }
    ],
    weight: [
      { from: '1', fromUnit: 'kg', toUnit: 'lb', label: '1 kilogram = ? pounds' },
      { from: '1', fromUnit: 'lb', toUnit: 'kg', label: '1 pound = ? kilograms' },
      { from: '1', fromUnit: 'oz', toUnit: 'g', label: '1 ounce = ? grams' }
    ],
    temperature: [
      { from: '0', fromUnit: 'c', toUnit: 'f', label: '0°C = ?°F' },
      { from: '100', fromUnit: 'c', toUnit: 'f', label: '100°C = ?°F' },
      { from: '32', fromUnit: 'f', toUnit: 'c', label: '32°F = ?°C' }
    ]
  };

  const loadQuickConversion = (conversion) => {
    setFromValue(conversion.from);
    setFromUnit(conversion.fromUnit);
    setToUnit(conversion.toUnit);
  };

  return (
    <div className={styles.unitConverterContainer}>
      <div className={styles.header}>
        <h2>Unit Converter</h2>
        <p>Convert between different units of measurement</p>
      </div>

      {/* Category Selection */}
      <div className={styles.categorySection}>
        <h3>Select Category</h3>
        <div className={styles.categoryGrid}>
          {Object.entries(conversionData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`${styles.categoryButton} ${category === key ? styles.active : ''}`}
            >
              <div className={styles.categoryIcon}>
                {key === 'length' && '📏'}
                {key === 'weight' && '⚖️'}
                {key === 'temperature' && '🌡️'}
                {key === 'area' && '📐'}
                {key === 'volume' && '🧪'}
                {key === 'time' && '⏰'}
                {key === 'speed' && '🏃'}
                {key === 'pressure' && '💨'}
              </div>
              <div className={styles.categoryName}>{data.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Input */}
      <div className={styles.conversionSection}>
        <div className={styles.conversionInput}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>From</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className={styles.numberInput}
                placeholder="Enter value"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className={styles.unitSelect}
              >
                {Object.entries(conversionData[category].units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({key})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.swapButton}>
            <button onClick={swapUnits} className={styles.swapBtn}>
              ↔️
            </button>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>To</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                value={toValue}
                readOnly
                className={styles.numberInput}
                placeholder="Result"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className={styles.unitSelect}
              >
                {Object.entries(conversionData[category].units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({key})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Conversions */}
      {quickConversions[category] && (
        <div className={styles.quickConversionsSection}>
          <h3>Quick Conversions</h3>
          <div className={styles.quickConversionsGrid}>
            {quickConversions[category].map((conversion, index) => (
              <button
                key={index}
                onClick={() => loadQuickConversion(conversion)}
                className={styles.quickConversionButton}
              >
                {conversion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result Display */}
      {fromValue && toValue && (
        <div className={styles.resultSection}>
          <div className={styles.resultDisplay}>
            <div className={styles.resultValue}>
              {fromValue} {conversionData[category].units[fromUnit]?.name} =
            </div>
            <div className={styles.resultValue}>
              {toValue} {conversionData[category].units[toUnit]?.name}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button onClick={saveToHistory} className={styles.saveButton}>
          💾 Save to History
        </button>
        <button onClick={clearData} className={styles.clearButton}>
          🗑️ Clear
        </button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className={styles.historySection}>
          <h3>Conversion History</h3>
          <div className={styles.historyList}>
            {history.slice(0, 10).map((historyItem) => (
              <div key={historyItem.id} className={styles.historyItem}>
                <div className={styles.historyInfo}>
                  <div className={styles.historyConversion}>
                    {historyItem.fromValue} {conversionData[historyItem.category].units[historyItem.fromUnit]?.name} = 
                    {historyItem.toValue} {conversionData[historyItem.category].units[historyItem.toUnit]?.name}
                  </div>
                  <div className={styles.historyCategory}>
                    {conversionData[historyItem.category].name}
                  </div>
                  <div className={styles.historyDate}>
                    {new Date(historyItem.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className={styles.historyActions}>
                  <button 
                    onClick={() => loadFromHistory(historyItem)}
                    className={styles.loadButton}
                  >
                    📂 Load
                  </button>
                  <button 
                    onClick={() => deleteFromHistory(historyItem.id)}
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

      {/* Unit Information */}
      <div className={styles.unitInfoSection}>
        <h3>Available Units - {conversionData[category].name}</h3>
        <div className={styles.unitInfoGrid}>
          {Object.entries(conversionData[category].units).map(([key, unit]) => (
            <div key={key} className={styles.unitInfoItem}>
              <div className={styles.unitSymbol}>{key}</div>
              <div className={styles.unitName}>{unit.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Select a measurement category from the options above</li>
          <li>Enter the value you want to convert</li>
          <li>Choose the source unit (From)</li>
          <li>Choose the target unit (To)</li>
          <li>View the converted result instantly</li>
          <li>Use the swap button (↔️) to reverse the conversion</li>
          <li>Try the quick conversions for common conversions</li>
          <li>Save frequently used conversions to history</li>
        </ul>
      </div>
    </div>
  );
};

export default UnitConverterComponent;
