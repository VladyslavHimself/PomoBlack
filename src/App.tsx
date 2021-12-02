import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';
import { TimerButton } from './components/Ui/TimerButton/TimerButton';
import { Timer } from './services/TimerAPI/Timer.service';
import girlImage from './assets/girl.svg';
import jsonQuotes from './assets/database/quotes.json';

interface Quote {
    id: number;
    quote: string;
}

interface IQuote {
    quotes: Quote[];
}

const App = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>();

  const timer = new Timer();

  useEffect(() => {
    const randomId = Math.floor(Math.random() * jsonQuotes.quotes.length);
    const quote = jsonQuotes.quotes[randomId];
    setQuote(quote.quote);
  }, []);

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
      <img className={classes['girl-image']} src={girlImage} alt="GirlWork" />
      <h4 className={classes.quote}>- {quote} -</h4>
      <h1 className={classes.heading}>PomoBlack</h1>
      <span className={classes.timer}>
        <span>{minutes < 10 ? (0) : null}{minutes}</span>:<span>{seconds < 10 ? (0) : null}{seconds}</span>
      </span>
      <TimerButton onClickHandler={onStartTimerHandler} timerStatus={isTimerStarted}/>
    </div>
  );
}

export default App;
