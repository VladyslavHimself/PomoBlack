import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';
import { TimerButton } from './components/Ui/TimerButton/TimerButton';
import { Timer } from './services/TimerAPI/Timer.service';

const App = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);

  const timer = new Timer();

  useEffect(() => {
    if (isTimerStarted) {
     minutes <= 0 && seconds <= 0 ? setIsTimerStarted(!isTimerStarted)
     : timer.tick(seconds, minutes, setSeconds, setMinutes);
    }
  }, [minutes, seconds, isTimerStarted])

  const onStartTimerHandler = () => {
    setIsTimerStarted(prevState => !prevState);
  }

  return (
    <div className={classes.app}>
      <span className={classes.timer}>
        <span>{minutes < 10 ? (0) : null}{minutes}</span>:<span>{seconds < 10 ? (0) : null}{seconds}</span>
      </span>
      <TimerButton onClickHandler={onStartTimerHandler} timerStatus={isTimerStarted}/>
    </div>
  );
}

export default App;
