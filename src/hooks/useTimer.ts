import { useState, useEffect } from 'react';

interface TimerSettings {
  endTime: number;
  checkpoints: [number, number][];
}

export function useTimer(callback: (ms: number) => void, tick: number = 100) {
  const [resetCount, setResetCount] = useState<number>(0);

  useEffect(() => {
    let tickCount = 0;
    const timer = setInterval(() => {
      callback(tickCount * tick);
      tickCount++;
    }, tick);

    return () => { clearInterval(timer) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCount]);

  return [() => setResetCount(resetCount + 1)];
}

export function useStopwatch(callback: (checkpoint: number) => void, tick: number = 100) {
  const [settings, setSettings] = useState<TimerSettings>({
    endTime: 0,
    checkpoints: []
  });
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [nextCheckpointIndex, setNextCheckpointIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextTime = Date.now();
      if (nextTime > settings.endTime)
        nextTime = settings.endTime;
      
      setCurrentTime(nextTime);
    }, tick);

    return () => clearInterval(timer);
  }, [settings, tick]);

  useEffect(() => {
    if (settings.checkpoints.length <= nextCheckpointIndex) {
      return;
    }

    if (currentTime < settings.checkpoints[nextCheckpointIndex][1]) {
      return;
    }

    callback(settings.checkpoints[nextCheckpointIndex][0]);
    setNextCheckpointIndex(nextCheckpointIndex + 1);
  }, [settings, currentTime, callback, nextCheckpointIndex]);

  const startTimer = (ms: number, checkpoints: number[]) => {
    const newStartTime = Date.now();

    setSettings({
      endTime: newStartTime + ms,
      checkpoints: checkpoints
        .sort((a, b) => a - b)
        .map((v) => [v, newStartTime + v] as [number, number])
    });
    setNextCheckpointIndex(0);
  }

  return [settings.endTime - currentTime, startTimer] as [number, (ms: number, checkpoints: number[]) => void];
}