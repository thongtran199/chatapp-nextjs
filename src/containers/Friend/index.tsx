'use client';

import { Collapse, Flex } from 'antd';
import { useTranslations } from 'next-intl';

import FriendsComponent from './components/FriendsComponent';
import SentFriendsComponent from './components/SentFriendsComponent';
import ReceivedFriendRequestsComponent from './components/ReceivedFriendRequestsComponent';

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
      label: t('receivedFriendRequests'),
      children: <ReceivedFriendRequestsComponent />,
    },
  ];

  return (
    <Flex vertical justify="start" className="w-full" gap={16}>
      <Collapse items={items} defaultActiveKey={['1', '2', '3']} />
    </Flex>
  );
}
