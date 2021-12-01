import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';
import { Timer } from './services/TimerAPI/Timer.service';

const App = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(10);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);

  const timer = new Timer();

  useEffect(() => {
    if (isTimerStarted) {
     timer.tick(seconds, minutes, setSeconds, setMinutes);
    }
  }, [minutes, seconds, isTimerStarted])

  const onStartTimerHandler = () => {
    setIsTimerStarted(!isTimerStarted);
  }

  return (
    <div className={classes.app}>
      <span className={classes.timer}>
        {minutes}:{seconds}
      </span>
      <button className={classes['start-button']} onClick={onStartTimerHandler}>Start timer</button>
    </div>
  );
}

export default App;
