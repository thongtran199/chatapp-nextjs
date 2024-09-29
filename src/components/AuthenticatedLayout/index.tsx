import App from '@/containers/App';
import { Flex } from 'antd';
import { useTranslations } from 'next-intl';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Layout');

  return (
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
  );
}
