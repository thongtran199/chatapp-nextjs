'use client';

import { useEffect, useState, useCallback } from 'react';
import { getRemainingTime } from '@/utils/otp';

const useOtpTimer = (
  phoneNumber: string,
  taxCode: string,
): [number, () => void] => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    setTimeLeft(getRemainingTime(phoneNumber, taxCode));
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(getRemainingTime(phoneNumber, taxCode));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getRemainingTime(phoneNumber, taxCode);
      if (remainingTime <= 0) {
        clearInterval(interval);
      }
      setTimeLeft(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return [timeLeft, resetTimer];
};

export default useOtpTimer;
