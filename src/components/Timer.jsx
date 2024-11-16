import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (!isBreak) {
              setIsBreak(true);
              setMinutes(5);
              setSeconds(0);
            } else {
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="timer-section">
      <div className="timer-container">
        <h2>{isBreak ? 'Break Time!' : 'Work Time!'}</h2>
        <div className="timer">
          <p>
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </p>
        </div>
        <div className="timer-controls">
          <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;











