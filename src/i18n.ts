import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config/locale';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../resources/${locale}.json`)).default,
    timeZone: 'Asia/Ho_Chi_Minh',
    now: new Date(),
  };
});
