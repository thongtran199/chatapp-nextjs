'use client';

import React, { useCallback, useState } from 'react';
import { Dropdown, Space, Layout, Button, Avatar, Tooltip } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WechatOutlined,
  TwitterOutlined,
  UsergroupDeleteOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { LogoutButton } from '@/components/LogoutButton';
import { User } from '@/common/models/user';
import { useRouter } from '../Navigation';

const { Header: HeaderLayout } = Layout;

interface HeaderProps {
  userInfo: User;
  collapsedSidebar: boolean;
  setCollapsedSidebar: (collapsed: boolean) => void;
}

const items: MenuProps['items'] = [
  {
    label: <LogoutButton />,
    key: 'logout',
  },
];

export const Header = ({
  userInfo,
  collapsedSidebar,
  setCollapsedSidebar,
}: HeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();
  const toggleDropdown = useCallback(() => {
    setOpenDropdown((prevState) => !prevState);
  }, []);

  return (
    <HeaderLayout style={{ padding: 0 }}>
      <div className="flex flex-row justify-end h-[64px] items-center pr-6 bg-white gap-4">
        <Tooltip title="friend">
          <Button
            shape="round"
            size="large"
            icon={<UsergroupDeleteOutlined />}
            onClick={() => {
              router.push('/friend');
            }}
          />
        </Tooltip>

        <Tooltip title="chat">
          <Button
            shape="round"
            size="large"
            icon={<WechatOutlined />}
            onClick={() => {
              router.push('/chat');
            }}
          />
        </Tooltip>

        <Tooltip title="explore">
          <Button
            shape="round"
            size="large"
            icon={<TwitterOutlined />}
            onClick={() => {
              router.push('/explore');
            }}
          />
        </Tooltip>

        <Tooltip title="notification">
          <Button
            shape="round"
            size="large"
            icon={<BellOutlined />}
            onClick={() => {
              router.push('/notification');
            }}
          />
        </Tooltip>

        <Dropdown
          menu={{ items }}
          trigger={['click']}
          onOpenChange={toggleDropdown}
        >
          <Space>
            <div className="flex justify-center items-center gap-2">
              <Avatar
                src={userInfo.avatarUrl || undefined}
                icon={!userInfo.avatarUrl ? <UserOutlined /> : null}
                style={{ borderRadius: '32px' }}
              />

              <p className="flex justify-center items-center text-sm not-italic font-bold">
                {userInfo?.fullName}
              </p>
            </div>
            {!openDropdown ? <DownOutlined /> : <UpOutlined />}
          </Space>
        </Dropdown>
      </div>
    </HeaderLayout>
  );
};
