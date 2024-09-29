'use client';

import { Flex } from 'antd';

import { useDispatch, useSelector } from '@/lib/redux';
import { useEffect } from 'react';
import { selectNotifications } from './selectors';
import { getNotificationsAsync } from './thunks';
import User from '@/services/user';
import { Notification } from '@/common/models/notification';
import NotificationItem from './components/NotificationItem';
import { uniqueId } from 'lodash';

export default function NotificationP() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    dispatch(getNotificationsAsync(Number(User.getInstance().getUserId())));
  }, []);
  return (
    <Flex vertical justify="start" className="w-full mt-5" gap={3}>
      {notifications.map((notification: Notification) => {
        return (
          <NotificationItem key={uniqueId()} notification={notification} />
        );
      })}
    </Flex>
  );
}
