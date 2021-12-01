import React, { FC } from 'react'

import classes from './TimerButton.module.scss';

interface IProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>,
  timerStatus: boolean,
}

export const TimerButton = ({onClickHandler, timerStatus}: IProps): JSX.Element => {
  return (
    <button onClick={onClickHandler} className={classes['toggle-button']}>
      {
      timerStatus ? <div className={classes['toggle-button__play-icon']} />
                  : <div className={classes['toggle-button__pause-icon']} />
      }
    </button>
  );
};
