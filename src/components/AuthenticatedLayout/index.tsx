'use client';
import App from '@/containers/App';
import { Flex } from 'antd';
import { useTranslations } from 'next-intl';
import { StompSessionProvider } from 'react-stomp-hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Layout');
  return (
    <StompSessionProvider url={'http://localhost:8080/ws-endpoint'}>
      <App>
        <Flex
          className="h-full"
          style={{
            backgroundImage: 'url("/images/background.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {children}
        </Flex>
      </App>
    </StompSessionProvider>
  );
}
