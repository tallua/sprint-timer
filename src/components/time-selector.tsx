import React, { useState, FunctionComponent } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export const TimeSelector: FunctionComponent<{
  onTimeSelected?: (ms: number) => void
}> = (props) => {
  const [timerTimeTemp, setTimerTimeTemp] = useState<number>(3600000);
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
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="timer-time-input"> Time </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="MM:SS"
        defaultValue="60:00"
        onChange={(value) => parseTimerTimeTempString(value.target.value)} />
      <Button
        variant="success"
        onClick={() => props.onTimeSelected && props.onTimeSelected(timerTimeTemp)}>
        Start
      </Button>
      <Button
        variant="danger"
        onClick={() => props.onTimeSelected && props.onTimeSelected(timerTimeTemp)}>
        Stop
      </Button>
    </InputGroup>
  )
}