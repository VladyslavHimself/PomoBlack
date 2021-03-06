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

  const setQuoteForCurrentSession = (): void => {
    const randomId = Math.floor(Math.random() * jsonQuotes.quotes.length);
    const quote = jsonQuotes.quotes[randomId];
    setQuote(quote.quote);
  }

  const setSessionStorageTimerCounter = (): void => {
    sessionStorage.setItem('timerValue', '1');
  }

  useEffect(() => {
    setQuoteForCurrentSession();
    setSessionStorageTimerCounter();
  }, []);

  const getTimerCounterAndUpdateLocally = (): number => {
    let timerValue = Number(sessionStorage.getItem('timerValue'));
    return timerValue += 1;
  };

  const updateTimerCounterGlobally = (timerValue: number): void => {
    sessionStorage.setItem('timerValue', timerValue.toString());
  }

  const updateTimerValues = (timerValue: number, focusTime: number, breakTime: number): void => {
    if (timerValue % 2 === 0) {
      setMinutes(5);
      setSeconds(0);
    } else {
      setMinutes(25);
      setSeconds(0);
    }
  } 

  const runRefreshTimerAlgorithm = (): void => {

    const FOCUS_TIME_BY_DEFAULT = 25;
    const BREAK_TIME_BY_DEFAULT = 5;

    setIsTimerStarted(!isTimerStarted);
    const timerValue = getTimerCounterAndUpdateLocally();
    updateTimerCounterGlobally(timerValue);
    updateTimerValues(timerValue, FOCUS_TIME_BY_DEFAULT, BREAK_TIME_BY_DEFAULT);
  }

  useEffect(() => {
    if (isTimerStarted) {
     minutes <= 0 && seconds <= 0 ? runRefreshTimerAlgorithm()
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
