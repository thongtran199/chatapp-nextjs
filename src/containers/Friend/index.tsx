'use client';

import { Collapse } from 'antd';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useTranslations } from 'next-intl';

import FriendsComponent from './components/FriendsComponent';
import SentFriendsComponent from './components/SentFriendsComponent';
import DeclinedFriendsComponent from './components/DeclinedFriendsComponent';

export default function Friend() {
  const t = useTranslations('FriendPage');
  const items = [
    {
      key: '1',
      label: t('friendList'),
      children: <FriendsComponent />,
    },
    {
      key: '2',
      label: t('pendingRequests'),
      children: <SentFriendsComponent />,
    },
    {
      key: '3',
      label: t('declinedRequests'),
      children: <DeclinedFriendsComponent />,
    },
  ];

  return (
    <Flex vertical justify="start" className="w-full" gap={16}>
      <Text>{t('friendListTitle')}</Text>

      <Collapse items={items} defaultActiveKey={['1']} accordion />
    </Flex>
  );
}
