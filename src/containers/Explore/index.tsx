'use client';

import { useTranslations } from 'next-intl';
import SearchUser from './components/SearchUser';
import { Flex } from 'antd';

export default function Explore() {
  const t = useTranslations('ExplorePage');

  return (
    <Flex vertical className="w-full mt-5">
      <p className="font-semibold text-2xl text-center pb-8">{t('title')}</p>
      <SearchUser />
    </Flex>
  );
}
