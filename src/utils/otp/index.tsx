import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../cache';

interface OtpItem {
  expiry: number;
}

export const setOtp = (
  phoneNumber: string,
  taxCode: string,
  ttl: number,
): void => {
  const now = Date.now();
  const item: OtpItem = {
    expiry: now + ttl * 1000, // ttl in seconds
  };
  setLocalStorage(`otp_${phoneNumber}_${taxCode}`, JSON.stringify(item));
};

export const getRemainingTime = (
  phoneNumber: string,
  taxCode: string,
): number => {
  const itemStr = getLocalStorage(`otp_${phoneNumber}_${taxCode}`);
  if (!itemStr) {
    return 0;
  }
  const item: OtpItem = JSON.parse(itemStr);
  const now = Date.now();
  const remainingTime = item.expiry - now;
  if (remainingTime <= 0) {
    removeLocalStorage('otp');
    return 0;
  }
  return remainingTime;
};
