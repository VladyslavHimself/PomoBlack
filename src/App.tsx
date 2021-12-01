import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';

const App = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(10);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);


  const tickTimer = () => {
    const declaredTimerConstants = {
      MINIMUM_SECOND_COUNT: 0,
      MINIMUM_MINUTE_COUNT: 0,
      RENEWED_MINUTES: 59,
    }
    const { MINIMUM_SECOND_COUNT, MINIMUM_MINUTE_COUNT, RENEWED_MINUTES } = declaredTimerConstants;

    setTimeout(() => {
      if (seconds <= MINIMUM_SECOND_COUNT) {
        setSeconds(RENEWED_MINUTES);
        setMinutes(minutes - 1);  
      } else if (seconds > MINIMUM_MINUTE_COUNT) {
        setSeconds(seconds - 1);
      }
   }, 1000);
  }

  useEffect(() => {
    if (isTimerStarted) {
     tickTimer();
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
