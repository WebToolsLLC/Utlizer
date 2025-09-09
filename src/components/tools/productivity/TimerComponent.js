// src/components/tools/productivity/TimerComponent.js
import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/components/Timer.module.css';

const TimerComponent = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [presets, setPresets] = useLocalStorage('timer-presets', [
    { name: 'Pomodoro', hours: 0, minutes: 25, seconds: 0 },
    { name: 'Short Break', hours: 0, minutes: 5, seconds: 0 },
    { name: 'Long Break', hours: 0, minutes: 15, seconds: 0 },
    { name: 'Cooking', hours: 0, minutes: 30, seconds: 0 }
  ]);
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Calculate total seconds
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Start timer
  const startTimer = () => {
    if (totalSeconds <= 0) return;
    
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setIsCompleted(false);
  };

  // Stop timer
  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Reset timer
  const resetTimer = () => {
    stopTimer();
    setTimeLeft(0);
    setIsCompleted(false);
  };

  // Add preset
  const addPreset = () => {
    const name = prompt('Enter preset name:');
    if (name && totalSeconds > 0) {
      const newPreset = { name, hours, minutes, seconds };
      setPresets([...presets, newPreset]);
    }
  };

  // Load preset
  const loadPreset = (preset) => {
    setHours(preset.hours);
    setMinutes(preset.minutes);
    setSeconds(preset.seconds);
    resetTimer();
  };

  // Delete preset
  const deletePreset = (index) => {
    const newPresets = presets.filter((_, i) => i !== index);
    setPresets(newPresets);
  };

  // Format time display
  const formatTime = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            if (soundEnabled) {
              // Play notification sound
              if (audioRef.current) {
                audioRef.current.play().catch(console.error);
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, soundEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerHeader}>
        <h2>Online Timer</h2>
        <p>Set a countdown timer for your tasks and activities</p>
      </div>

      {/* Timer Display */}
      <div className={`${styles.timerDisplay} ${isCompleted ? styles.completed : ''}`}>
        <div className={styles.timeText}>
          {formatTime(timeLeft || totalSeconds)}
        </div>
        <div className={styles.timerStatus}>
          {isCompleted ? '⏰ Time\'s Up!' : isRunning ? '⏱️ Running' : '⏸️ Ready'}
        </div>
      </div>

      {/* Timer Controls */}
      <div className={styles.timerControls}>
        <div className={styles.timeInputs}>
          <div className={styles.inputGroup}>
            <label>Hours</label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
              disabled={isRunning}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
            />
          </div>
        </div>

        <div className={styles.controlButtons}>
          {!isRunning ? (
            <button 
              onClick={startTimer} 
              disabled={totalSeconds <= 0}
              className={styles.startButton}
            >
              ▶️ Start Timer
            </button>
          ) : (
            <button onClick={stopTimer} className={styles.stopButton}>
              ⏸️ Pause
            </button>
          )}
          <button onClick={resetTimer} className={styles.resetButton}>
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Quick Presets */}
      <div className={styles.presetsSection}>
        <div className={styles.presetsHeader}>
          <h3>Quick Presets</h3>
          <button onClick={addPreset} className={styles.addPresetButton}>
            ➕ Add Preset
          </button>
        </div>
        <div className={styles.presetsGrid}>
          {presets.map((preset, index) => (
            <div key={index} className={styles.presetCard}>
              <button 
                onClick={() => loadPreset(preset)}
                className={styles.presetButton}
                disabled={isRunning}
              >
                <div className={styles.presetName}>{preset.name}</div>
                <div className={styles.presetTime}>
                  {formatTime(preset.hours * 3600 + preset.minutes * 60 + preset.seconds)}
                </div>
              </button>
              <button 
                onClick={() => deletePreset(index)}
                className={styles.deletePreset}
                title="Delete preset"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className={styles.settingsSection}>
        <h3>Settings</h3>
        <div className={styles.settingItem}>
          <label>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
            Enable notification sound
          </label>
        </div>
      </div>

      {/* Hidden audio element for notifications */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/timer-alert.mp3" type="audio/mpeg" />
        <source src="/sounds/timer-alert.ogg" type="audio/ogg" />
      </audio>

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to Use</h3>
        <ol>
          <li>Set the desired time using the hour, minute, and second inputs</li>
          <li>Click "Start Timer" to begin the countdown</li>
          <li>Use quick presets for common time intervals</li>
          <li>Add your own custom presets for frequently used times</li>
          <li>Enable sound notifications to be alerted when time is up</li>
        </ol>
      </div>
    </div>
  );
};

export default TimerComponent;
