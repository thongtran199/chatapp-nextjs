'use client';

import { Avatar, Flex, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { useSelector, useDispatch } from '@/lib/redux';
import { selectUser } from '@/containers/App/selectors';
import { getUserAsync } from '@/containers/App/thunks';
import { useSubscription } from 'react-stomp-hooks';
import User from '@/services/user';
import { NotificationSocketDTO } from '@/common/models/notification';
const { Content } = Layout;
import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { selectChatFrameIsOpening } from '../Chat/selectors';

type NotificationPlacement = NotificationArgsProps['placement'];

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chatFrameIsOpening = useSelector(selectChatFrameIsOpening);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    notification: NotificationSocketDTO,
  ) => {
    api.info({
      message: notification.header,
      description: notification.content,
      placement,
      icon: (
        <Avatar
          src={notification.avatarUrl || undefined}
          icon={!notification.avatarUrl ? <UserOutlined /> : null}
          size={32}
          className="mr-4"
        />
      ),
    });
  };

  useSubscription(
    `/queue/notification-${User.getInstance().getUserId()}`,
    (receivedFrame: any) => {
      const binaryBody = receivedFrame._binaryBody;
      const decoder = new TextDecoder('utf-8');
      const jsonString = decoder.decode(binaryBody);
      const notification: NotificationSocketDTO = JSON.parse(jsonString);
      openNotification('top', notification);
    },
  );

  useSubscription(
    `/queue/message-${User.getInstance().getUserId()}`,
    (receivedFrame: any) => {
      if (chatFrameIsOpening) return;
      const binaryBody = receivedFrame._binaryBody;
      const decoder = new TextDecoder('utf-8');
      const jsonString = decoder.decode(binaryBody);
      const notification: NotificationSocketDTO = JSON.parse(jsonString);
      openNotification('top', notification);
    },
  );

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <>
      {contextHolder}{' '}
      <Layout className="h-screen w-full" hasSider>
        <Layout className="w-full h-full">
          <Header
            userInfo={
              user
                ? user
                : {
                    userId: -1,
                    avatarUrl: null,
                    username: 'username',
                    fullName: 'fullName',
                    email: 'email',
                  }
            }
          />
          <Content className="bg-white h-full overflow-auto">
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
