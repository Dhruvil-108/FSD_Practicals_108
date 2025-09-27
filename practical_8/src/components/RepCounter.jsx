import React, { useState, useEffect } from 'react';
import '../assets/RepCounter.css';

const RepCounter = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(10); // default target
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    const savedCount = localStorage.getItem('repCount');
    const savedTarget = localStorage.getItem('repTarget');
    // const savedDark = localStorage.getItem('repDarkMode');
    if (savedCount !== null) setCount(parseInt(savedCount, 10));
    if (savedTarget !== null) setTarget(parseInt(savedTarget, 10));
    // if (savedDark !== null) setDarkMode(savedDark === 'true');
  }, []);

  // Save to localStorage when changed
  useEffect(() => localStorage.setItem('repCount', count), [count]);
  useEffect(() => localStorage.setItem('repTarget', target), [target]);
  // useEffect(() => localStorage.setItem('repDarkMode', darkMode), [darkMode]);

  const playBeep = () => {
    // Create beep
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
  };

  const increment = () => {
    setCount(prev => {
      const newCount = prev + 1;
      playBeep();
      if (navigator.vibrate) navigator.vibrate(50);
      return newCount;
    });
  };

  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  const progress = Math.min((count / target) * 100, 100);

  return (
    <div className={`counter-container ${darkMode ? 'dark' : ''}`}>
      <h1 className="counter-title">🏋️ Gym Rep Counter</h1>

      {/* Theme Toggle */}
      

      {/* Target Input */}
      <div className="target-container">
        <label>Target Reps:</label>
        <input
          type="number"
          value={target}
          onChange={e => setTarget(Math.max(1, parseInt(e.target.value, 10)))}
          className="target-input"
        />
      </div>

      {/* Counter Display */}
      <div className="counter-display">{count}</div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        {count}/{target} reps
      </p>

      {/* Buttons */}
      <div className="button-group">
        <button className="btn decrement" onClick={decrement}>-</button>
        <button className="btn increment" onClick={increment}>+</button>
      </div>
      <button className="btn reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default RepCounter;
