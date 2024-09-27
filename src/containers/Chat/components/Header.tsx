'use client';
import Image from '@/components/Image';
import { useSelector } from '@/lib/redux';
import { Flex } from 'antd';
import React from 'react';
import { selectCurrentChat } from '../selectors';

export default function Header() {
  const currentChat = useSelector(selectCurrentChat);

  return (
    <Flex justify="space-between">
      <Flex justify="flex-start" align="center">
        <Image
          src={currentChat?.avatarUrl || ''}
          width={30}
          height={30}
          alt="avatar"
        />
        <p className="ml-1 text-[1rem]">{currentChat?.fullName}</p>
      </Flex>
    </Flex>
  );
}
