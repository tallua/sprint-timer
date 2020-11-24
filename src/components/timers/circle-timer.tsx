import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
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
  const milisec = Math.round(ms / 1000) * 1000;
  const sec = Math.floor((milisec / 1000) % 60);
  const min = Math.floor((milisec / 60000) % 60);

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
  totalTime?: number
}> = (props) => {
  const [supportNoti, setSupportNoti] = useState<boolean>(false);

  const totalTime = props.totalTime ? props.totalTime : 3600000;
  const [timerTime, setTimerTime] = useState<number>(0);
  const [timerTimeTemp, setTimerTimeTemp] = useState<number>(3600000);

  const sendNotification = (ms: number) => {
    if (!supportNoti || timerTime === 0) {
      return;
    }
    new Notification(`${convertRemainTime(remainTime)} Remain`);
  }

  const [remainTime, startStopwatch] = useStopwatch((ms) => {
    sendNotification(ms);
    console.log(`alarm: ${ms}`);
  }, 100);

  useEffect(() => {
    startStopwatch(
      timerTime,
      range(0, 1, 1 / 12).map((v) => v * totalTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTime]);

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

  const parseTimerTimeTempString = (value: string) => {
    if (value.match(/^\d\d:\d\d$/g) === null)
      return;

    const min = parseInt(value.split(':')[0]);
    const sec = parseInt(value.split(':')[1]);
    const nextTimer = 1000 * (sec + 60 * min);
    console.log('set timer temp : ' + nextTimer);
    setTimerTimeTemp(nextTimer);
  };

  return (
    <div>
      <p> Sprint Timer</p>
      <div className="circle-timer-clock">
        <svg className="circle-timer-svg"
          viewBox={`0 0 ${4 * unit} ${4 * unit}`}>
          <Circle
            percentage={100} />
          <CircleTime />
          <Circle
            percentage={100 * remainTime / totalTime} />
        </svg>
      </div>
      <p> {convertRemainTime(remainTime)} Remain </p>
      <div className="circle-timer-footer">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="timer-time-input"> Time </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="MM:SS"
            defaultValue="60:00"
            onChange={(value) => parseTimerTimeTempString(value.target.value)} />
          <Button variant="success" onClick={() => setTimerTime(timerTimeTemp)}> Start </Button>
          <Button variant="danger" onClick={() => setTimerTime(0)}> Stop </Button>
        </InputGroup>
      </div>
    </div>
  );
}