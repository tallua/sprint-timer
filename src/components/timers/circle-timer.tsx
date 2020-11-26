import React, { FunctionComponent, useContext, useState } from 'react';
import { NotificationContext } from '../notification-context';
import { TimeSelector } from '../time-selector';
import { useStopwatch } from '../../hooks/useTimer';
import './circle-timer.css'

const unit = 15.9155;

function range(begin: number, end: number, interval: number) {
  let result: number[] = [];

  let current = begin;
  while (current <= end) {
    result.push(current);
    current += interval;
  }

  return result;
}

function convertRemainTime(ms: number) {
  if (ms < 0)
    ms = 0;
  const milisec = Math.round(ms / 1000) * 1000;
  const sec = Math.floor((milisec / 1000) % 60);
  const min = Math.floor((milisec / 60000));

  const sec_str = ("0" + sec).slice(-2);
  const min_str = min === 60 ? min : ("0" + min).slice(-2);

  return `${min_str}:${sec_str}`
}

const Circle: FunctionComponent<{
  percentage: number
}> = (props) => {
  const percentage = props.percentage;
  return (
    <g>
      <circle
        cx={2 * unit}
        cy={2 * unit}
        r={unit}
        fill={'none'}
        strokeWidth={2 * unit}
        strokeDasharray={`${percentage} 100`}
      />
    </g>
  )
}
const getLine = (center: number, r1: number, r2: number, rotate: number): [number, number][] => {
  const rad = rotate / 180 * Math.PI;

  return [
    [center + r1 * Math.cos(rad), center + r1 * Math.sin(rad)],
    [center + r2 * Math.cos(rad), center + r2 * Math.sin(rad)]
  ];
}

const CircleTime: FunctionComponent = (props) => {
  const center = unit * 2;
  const r1 = unit * 1.4;
  const r2 = unit * 1.8;

  return (
    <g>
      {
        range(0, 11, 1).map((num) => {
          const line = getLine(center, r1, r2, num * 30);

          if (num % 3 === 0) {
            return <line key={num}
              x1={line[0][0]} y1={line[0][1]}
              x2={line[1][0]} y2={line[1][1]}
              strokeWidth={2} />
          } else {
            return <line key={num}
              x1={line[0][0]} y1={line[0][1]}
              x2={line[1][0]} y2={line[1][1]}
              strokeWidth={1} />
          }
        })
      }
    </g>
  )
}

const CircleHand: FunctionComponent<{
  percentage: number
}> = (props) => {
  const center = unit * 2;
  const r1 = unit * 0.2;
  const r2 = unit * 2;

  const line1 = getLine(center, r1, r2, 3.6 * props.percentage);
  const line2 = getLine(center, r1, r2, 0);

  return (
    <g>
      <circle
        cx={2 * unit}
        cy={2 * unit}
        r={r1} />
      <line
        x1={line1[0][0]} y1={line1[0][1]}
        x2={line1[1][0]} y2={line1[1][1]}
        strokeWidth={1} />
      <line
        x1={line2[0][0]} y1={line2[0][1]}
        x2={line2[1][0]} y2={line2[1][1]}
        strokeWidth={1} />
    </g>
  )
}

const CircleClockImage: FunctionComponent<{
  percentage: number;
}> = (props) => {
  return (
    <svg className="circle-timer-svg"
      viewBox={`0 0 ${4 * unit} ${4 * unit}`}>
      <Circle
        percentage={100} />
      <CircleTime />
      <Circle
        percentage={100 * props.percentage} />
      <CircleHand
        percentage={100 * props.percentage} />
    </svg>
  );
}

export const CircleTimer: FunctionComponent<{
  totalTime?: number
}> = (props) => {
  const totalTime = props.totalTime ? props.totalTime : 3600000;
  const alarmTimes = range(0, 1, 1 / 12).map((v) => v * totalTime);

  const { sendNotification } = useContext(NotificationContext);
  const [alarmEnabled, setAlarmEnabled] = useState<boolean>(false);
  const [remainTime, startStopwatch] = useStopwatch((ms) => {
    if (!alarmEnabled) {
      return;
    }

    console.log(`alarm: ${ms}`);
    sendNotification(`${convertRemainTime(ms)} Remain`);

    if (ms === 0)
      setAlarmEnabled(false);
  }, 100);

  return (
    <div>
      <p> Sprint Timer</p>
      <div className="circle-timer-clock">
        <CircleClockImage percentage={remainTime / totalTime} />
      </div>
      <p> {convertRemainTime(remainTime)} </p>
      <div className="circle-timer-footer">
        <TimeSelector
          initTime={totalTime}
          onTimeSelected={(ms) => {
            setAlarmEnabled(ms !== 0);
            console.log(`start stopwatch: ${ms}`);
            startStopwatch(ms, alarmTimes);
          }} />
      </div>
    </div>
  );
}