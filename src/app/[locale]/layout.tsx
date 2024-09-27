import { NextIntlClientProvider, useMessages, useTimeZone } from 'next-intl';

export default function MainLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  const timeZone = useTimeZone();

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}
