import { Flex } from 'antd';
import { useTranslations } from 'next-intl';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Layout');

  return (
    <Flex className="p-8 pb-0 grow min-h-screen" vertical>
      <Flex
        className="grow"
        style={{
          backgroundImage: 'url("/images/background.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
