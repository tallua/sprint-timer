import React, { FunctionComponent, useEffect, useState } from 'react';
import { useStopwatch, useTimer } from '../../hooks/useTimer';
import './circle-timer.css'

const Circle: FunctionComponent<{
  className?: string
}> = (props) => {
  return (
    <svg className={props.className}>
      <circle
        cx={'50%'}
        cy={'50%'}
        r={'50%'}/>
    </svg>
  )
}

function range(begin: number, end: number, interval: number) {
  let result: number[] = [];

  let current = begin;
  while (current <= end) {
    result.push(current);
    current += interval;
  }

  return result;
}

export const CircleTimer: FunctionComponent = (props) => {

  const [initTime, ] = useState<number>(36000);

  const [resetTimer] = useTimer((ms) => {
    console.log(ms);
  }, 100);

  const [startStopwatch] = useStopwatch((ms) => {
    console.log(`alarm: ${ms}`);
  }, 100);

  useEffect(() => {
    resetTimer();
    startStopwatch(
      initTime,
      range(0, 1, 0.1).map((v) => v * initTime));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initTime]);

  return (
    <div className="circle-timer">
      <Circle
        className="circle-timer-background"/>
      <Circle
        className="circle-timer-foreground"/>
    </div>
  );
}