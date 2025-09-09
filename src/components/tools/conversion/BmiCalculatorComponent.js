// src/components/tools/conversion/BmiCalculatorComponent.js
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/BMICalculator.module.css';

const BmiCalculatorComponent = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiColor, setBmiColor] = useState('');
  const [idealWeight, setIdealWeight] = useState({ min: 0, max: 0 });
  const [history, setHistory] = useLocalStorage('bmi-history', []);

  // BMI categories
  const bmiCategories = [
    { min: 0, max: 18.5, category: 'Underweight', color: '#3B82F6', description: 'You may need to gain weight' },
    { min: 18.5, max: 25, category: 'Normal weight', color: '#10B981', description: 'Healthy weight range' },
    { min: 25, max: 30, category: 'Overweight', color: '#F59E0B', description: 'Consider losing weight' },
    { min: 30, max: 35, category: 'Obesity Class I', color: '#EF4444', description: 'Moderate obesity' },
    { min: 35, max: 40, category: 'Obesity Class II', color: '#DC2626', description: 'Severe obesity' },
    { min: 40, max: Infinity, category: 'Obesity Class III', color: '#991B1B', description: 'Very severe obesity' }
  ];

  // Calculate BMI
  const calculateBMI = () => {
    let heightInMeters, weightInKg;

    if (unitSystem === 'metric') {
      heightInMeters = height / 100; // Convert cm to meters
      weightInKg = weight;
    } else {
      // Imperial: height in feet and inches, weight in pounds
      heightInMeters = (height * 0.3048) + (height % 1 * 0.0254); // Convert feet to meters
      weightInKg = weight * 0.453592; // Convert pounds to kg
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue);

    // Find BMI category
    const category = bmiCategories.find(cat => bmiValue >= cat.min && bmiValue < cat.max);
    if (category) {
      setBmiCategory(category.category);
      setBmiColor(category.color);
    }

    // Calculate ideal weight range
    const idealMin = 18.5 * heightInMeters * heightInMeters;
    const idealMax = 25 * heightInMeters * heightInMeters;
    
    if (unitSystem === 'metric') {
      setIdealWeight({ min: idealMin, max: idealMax });
    } else {
      setIdealWeight({ 
        min: idealMin / 0.453592, 
        max: idealMax / 0.453592 
      });
    }
  };

  // Update BMI when values change
  useEffect(() => {
    calculateBMI();
  }, [height, weight, unitSystem]);

  // Save to history
  const saveToHistory = () => {
    const historyItem = {
      id: Date.now(),
      height: height,
      weight: weight,
      unitSystem: unitSystem,
      bmi: bmi,
      bmiCategory: bmiCategory,
      timestamp: new Date().toISOString()
    };

    setHistory([historyItem, ...history.slice(0, 19)]); // Keep last 20
  };

  // Load from history
  const loadFromHistory = (historyItem) => {
    setHeight(historyItem.height);
    setWeight(historyItem.weight);
    setUnitSystem(historyItem.unitSystem);
  };

  // Delete from history
  const deleteFromHistory = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  // Clear all data
  const clearData = () => {
    setHeight(unitSystem === 'metric' ? 170 : 5.6);
    setWeight(unitSystem === 'metric' ? 70 : 154);
  };

  // Get BMI interpretation
  const getBMIInterpretation = () => {
    const category = bmiCategories.find(cat => bmi >= cat.min && bmi < cat.max);
    return category ? category.description : '';
  };

  // Get weight difference from ideal
  const getWeightDifference = () => {
    if (bmi < 18.5) {
      const targetWeight = idealWeight.min;
      const difference = targetWeight - weight;
      return {
        type: 'gain',
        amount: Math.abs(difference),
        text: `You need to gain ${Math.abs(difference).toFixed(1)} ${unitSystem === 'metric' ? 'kg' : 'lbs'} to reach normal weight`
      };
    } else if (bmi > 25) {
      const targetWeight = idealWeight.max;
      const difference = weight - targetWeight;
      return {
        type: 'lose',
        amount: Math.abs(difference),
        text: `You need to lose ${Math.abs(difference).toFixed(1)} ${unitSystem === 'metric' ? 'kg' : 'lbs'} to reach normal weight`
      };
    } else {
      return {
        type: 'maintain',
        amount: 0,
        text: 'You are within the healthy weight range'
      };
    }
  };

  const weightDifference = getWeightDifference();

  return (
    <div className={styles.bmiCalculatorContainer}>
      <div className={styles.header}>
        <h2>BMI Calculator</h2>
        <p>Calculate your Body Mass Index and get health insights</p>
      </div>

      {/* Unit System Selection */}
      <div className={styles.unitSystemSection}>
        <h3>Unit System</h3>
        <div className={styles.unitButtons}>
          <button
            onClick={() => setUnitSystem('metric')}
            className={`${styles.unitButton} ${unitSystem === 'metric' ? styles.active : ''}`}
          >
            Metric (kg, cm)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`${styles.unitButton} ${unitSystem === 'imperial' ? styles.active : ''}`}
          >
            Imperial (lbs, ft)
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            Height {unitSystem === 'metric' ? '(cm)' : '(feet)'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
            className={styles.numberInput}
            min="50"
            max={unitSystem === 'metric' ? '300' : '10'}
            step={unitSystem === 'metric' ? '1' : '0.1'}
          />
          <div className={styles.inputRange}>
            <span>{unitSystem === 'metric' ? '50' : '3'}</span>
            <span>{unitSystem === 'metric' ? '300' : '10'}</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            Weight {unitSystem === 'metric' ? '(kg)' : '(lbs)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className={styles.numberInput}
            min="20"
            max={unitSystem === 'metric' ? '300' : '660'}
            step="0.1"
          />
          <div className={styles.inputRange}>
            <span>{unitSystem === 'metric' ? '20' : '44'}</span>
            <span>{unitSystem === 'metric' ? '300' : '660'}</span>
          </div>
        </div>
      </div>

      {/* BMI Results */}
      <div className={styles.resultsSection}>
        <div className={styles.bmiDisplay}>
          <div className={styles.bmiValue} style={{ color: bmiColor }}>
            {bmi.toFixed(1)}
          </div>
          <div className={styles.bmiLabel}>BMI</div>
        </div>

        <div className={styles.bmiCategory} style={{ color: bmiColor }}>
          {bmiCategory}
        </div>

        <div className={styles.bmiDescription}>
          {getBMIInterpretation()}
        </div>
      </div>

      {/* BMI Scale */}
      <div className={styles.bmiScaleSection}>
        <h3>BMI Scale</h3>
        <div className={styles.bmiScale}>
          {bmiCategories.map((category, index) => (
            <div
              key={index}
              className={styles.scaleItem}
              style={{ 
                backgroundColor: category.color,
                width: `${(category.max - category.min) * 2}%`
              }}
            >
              <div className={styles.scaleLabel}>
                {category.min}-{category.max === Infinity ? '∞' : category.max.toFixed(1)}
              </div>
              <div className={styles.scaleCategory}>{category.category}</div>
            </div>
          ))}
        </div>
        <div className={styles.scaleIndicator}>
          <div 
            className={styles.indicator}
            style={{ 
              left: `${Math.min(Math.max((bmi - 15) * 2, 0), 100)}%`,
              backgroundColor: bmiColor
            }}
          />
        </div>
      </div>

      {/* Ideal Weight Range */}
      <div className={styles.idealWeightSection}>
        <h3>Ideal Weight Range</h3>
        <div className={styles.idealWeightDisplay}>
          <div className={styles.idealWeightRange}>
            {idealWeight.min.toFixed(1)} - {idealWeight.max.toFixed(1)} {unitSystem === 'metric' ? 'kg' : 'lbs'}
          </div>
          <div className={styles.weightDifference}>
            {weightDifference.text}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button onClick={saveToHistory} className={styles.saveButton}>
          💾 Save to History
        </button>
        <button onClick={clearData} className={styles.clearButton}>
          🗑️ Clear Data
        </button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className={styles.historySection}>
          <h3>Calculation History</h3>
          <div className={styles.historyList}>
            {history.slice(0, 10).map((historyItem) => (
              <div key={historyItem.id} className={styles.historyItem}>
                <div className={styles.historyInfo}>
                  <div className={styles.historyValues}>
                    {historyItem.height} {historyItem.unitSystem === 'metric' ? 'cm' : 'ft'} | 
                    {historyItem.weight} {historyItem.unitSystem === 'metric' ? 'kg' : 'lbs'}
                  </div>
                  <div className={styles.historyBMI}>
                    BMI: {historyItem.bmi.toFixed(1)} ({historyItem.bmiCategory})
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

      {/* Health Information */}
      <div className={styles.healthInfoSection}>
        <h3>About BMI</h3>
        <div className={styles.healthInfo}>
          <p>
            Body Mass Index (BMI) is a measure of body fat based on height and weight. 
            It's a useful screening tool but doesn't account for muscle mass, bone density, 
            or overall body composition.
          </p>
          <p>
            <strong>Important:</strong> BMI is not a diagnostic tool. Consult with a 
            healthcare professional for a comprehensive health assessment.
          </p>
        </div>
      </div>

      {/* BMI Categories Reference */}
      <div className={styles.categoriesSection}>
        <h3>BMI Categories</h3>
        <div className={styles.categoriesGrid}>
          {bmiCategories.map((category, index) => (
            <div key={index} className={styles.categoryItem}>
              <div 
                className={styles.categoryColor}
                style={{ backgroundColor: category.color }}
              />
              <div className={styles.categoryInfo}>
                <div className={styles.categoryRange}>
                  {category.min} - {category.max === Infinity ? '∞' : category.max.toFixed(1)}
                </div>
                <div className={styles.categoryName}>{category.category}</div>
                <div className={styles.categoryDescription}>{category.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ul>
          <li>Select your preferred unit system (Metric or Imperial)</li>
          <li>Enter your height and weight</li>
          <li>View your BMI calculation and category</li>
          <li>Check your ideal weight range</li>
          <li>Save your results to track changes over time</li>
          <li>Remember: BMI is a screening tool, not a diagnostic tool</li>
        </ul>
      </div>
    </div>
  );
};

export default BmiCalculatorComponent;
