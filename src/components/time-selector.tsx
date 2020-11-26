import React, { useState, FunctionComponent } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function createMatcher(regex: RegExp, callback: (value: string) => number) {
  return (value: string, setTime: (ms: number) => void) => {
    if (value.match(regex) === null)
      return false;

    const result = callback(value);
    setTime(result);
    return true;
  }
}

function capTo(value: number, cap: number): number {
  return cap < value ? cap : value;
}

const timeMatcher1 = createMatcher(/^\d\d:\d\d$/g, (value) => {
  const min = capTo(parseInt(value.split(':')[0]), 59);
  const sec = capTo(parseInt(value.split(':')[1]), 59);
  const nextTimer = 1000 * (sec + 60 * min);

  return nextTimer;
});

const timeMatcher2 = createMatcher(/^\d\d.\d\d$/g, (value) => {
  const min = capTo(parseInt(value.split('.')[0]), 59);
  const sec = capTo(parseInt(value.split('.')[1]), 59);
  const nextTimer = 1000 * (sec + 60 * min);

  return nextTimer;
});

const timeMatcher3 = createMatcher(/^\d{1,2}$/g, (value) => {
  const min = capTo(parseInt(value), 60);
  const nextTimer = min === 60 ? 3599999 : 1000 * 60 * min;

  return nextTimer;
});

const matchers = [
  timeMatcher1,
  timeMatcher2,
  timeMatcher3
];


export const TimeSelector: FunctionComponent<{
  initTime?: number,
  onTimeSelected?: (ms: number) => void
}> = (props) => {
  const maxTime = 3599999;
  const initTime = props.initTime ? props.initTime : maxTime;
  const [timeSelect, setTimeSelect] = useState<number>(initTime);

  const onMatch = (ms: number) => {
    console.log(`time matched to : ${ms}`);
    setTimeSelect(ms);
  }

  const onTextChange = (text: string) => {
    for (const matcher of matchers) {
      if (matcher(text, onMatch))
        return;
    }
  }

  const onTimeSelect = (ms: number) => {
    if(!props.onTimeSelected) {
      return;
    }

    ms = maxTime < ms ? maxTime : ms;
    props.onTimeSelected(ms)
  }

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="timer-time-input"> Time </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="MM:SS"
        defaultValue="60:00"
        onChange={(value) => onTextChange(value.target.value)} />
      <Button
        variant="success"
        onClick={() => onTimeSelect(timeSelect)}>
        Start
      </Button>
      <Button
        variant="danger"
        onClick={() => onTimeSelect(0)}>
        Stop
      </Button>
    </InputGroup>
  )
}