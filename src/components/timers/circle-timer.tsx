import React, { FunctionComponent, useEffect, useState } from 'react';
import { useStopwatch, useTimer } from '../../hooks/useTimer';
import './circle-timer.css'

const Circle: FunctionComponent<{
  className?: string,
  color: string,
  percentage: number
}> = (props) => {
  const percentage = props.percentage;
  return (
    <svg viewBox="0 0 63.662 63.662"
      className={props.className}>
      <circle
        cx={'31.831'}
        cy={'31.831'}
        r={'15.9155'}
        fill={'none'}
        stroke={props.color}
        strokeWidth={'31.831'}
        strokeDasharray={`${percentage} 100`}
        />
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

  const [totalTime,] = useState<number>(3600);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [resetTimer] = useTimer((ms) => {
    if (totalTime < ms)
      ms = totalTime;
    setCurrentTime(ms);
  }, 100);

  const [startStopwatch] = useStopwatch((ms) => {
    console.log(`alarm: ${ms}`);
  }, 100);

  useEffect(() => {
    resetTimer();
    startStopwatch(
      totalTime,
      range(0, 1, 0.1).map((v) => v * totalTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTime]);

  return (
    <div className="circle-timer">
      <Circle
        className="circle-timer-background"
        color='grey'
        percentage={100} />
      <Circle
        className="circle-timer-foreground"
        color='red'
        percentage={100 - 100 * currentTime / totalTime} />
    </div>
  );
}