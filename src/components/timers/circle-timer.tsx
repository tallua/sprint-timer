import React, { FunctionComponent, useEffect, useState } from 'react';
import { useStopwatch, useTimer } from '../../hooks/useTimer';
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
  const sec = Math.floor((ms / 1000) % 60);
  const min = Math.floor((ms / 60000) % 60);

  return `${min}:${sec}`
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



const CircleTime: FunctionComponent = (props) => {
  const getLine = (rotate: number): [number, number][] => {
    const center = unit * 2;
    const r1 = unit * 1.4;
    const r2 = unit * 1.95;
    const rad = rotate / 180 * Math.PI;

    return [
      [center + r1 * Math.cos(rad), center + r1 * Math.sin(rad)],
      [center + r2 * Math.cos(rad), center + r2 * Math.sin(rad)]
    ];
  }

  return (
    <g>
      {
        range(0, 11, 1).map((num) => {
          const line = getLine(num * 30);

          if (num % 3 === 0) {
            return <line key={num}
              x1={line[0][0]} y1={line[0][1]}
              x2={line[1][0]} y2={line[1][1]}
              strokeWidth={2} stroke="black" />
          } else {
            return <line key={num}
              x1={line[0][0]} y1={line[0][1]}
              x2={line[1][0]} y2={line[1][1]}
              strokeWidth={1} stroke="black" />
          }
        })
      }
    </g>
  )
}

export const CircleTimer: FunctionComponent<{
}> = (props) => {
  const [supportNoti, setSupportNoti] = useState<boolean>(false);

  const totalTime = 60000;
  const [initTime,] = useState<number>(totalTime);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const sendNotification = (ms: number) => {
    if (supportNoti) {
      new Notification(`${convertRemainTime(initTime - currentTime)} Remain`);
    }
  }

  const [resetTimer] = useTimer((ms) => {
    if (totalTime < ms)
      ms = totalTime;
    setCurrentTime(ms);
  }, 100);

  const [startStopwatch] = useStopwatch((ms) => {
    sendNotification(ms);
    console.log(`alarm: ${ms}`);
  }, 100);

  useEffect(() => {
    resetTimer();
    startStopwatch(
      initTime,
      range(0, 1, 1 / 12).map((v) => v * totalTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initTime]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          setSupportNoti(true);
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <div>

      </div>
      <div className="circle-timer">
        <svg className="circle-timer-svg"
          viewBox={`0 0 ${4 * unit} ${4 * unit}`}>
          <Circle
            percentage={100} />
          <CircleTime />
          <Circle
            percentage={100 - 100 * currentTime / totalTime} />
        </svg>
        <p> {convertRemainTime(initTime - currentTime)} Remain </p>
      </div>
    </div>
  );
}