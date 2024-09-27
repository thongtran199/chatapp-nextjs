'use client';

import { useTranslations } from 'next-intl';
import SearchUser from './components/SearchUser';
import { Flex } from 'antd';

export default function Explore() {
  const t = useTranslations('ExplorePage');
  const g = useTranslations('General');

  return (
    <Flex vertical className="w-full">
      <p className="font-semibold text-2xl text-center pb-8">{t('title')}</p>
      <SearchUser />
    </Flex>
  );
}
