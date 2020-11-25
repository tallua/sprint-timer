import { useState, useEffect } from 'react';

interface TimerSettings {
  endTime: number;
  checkpoints: [number, number][];
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

    return () => { 
      console.log('relase interval');  
      clearInterval(timer); 
    }
  }, [settings, tick]);

  useEffect(() => {
    if (settings.checkpoints.length <= nextCheckpointIndex) {
      return;
    }

    if (currentTime < settings.checkpoints[nextCheckpointIndex][1]) {
      return;
    }

    callback(settings.endTime - currentTime);
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