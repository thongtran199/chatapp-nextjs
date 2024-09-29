'use client';

import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { useSelector, useDispatch } from '@/lib/redux';
import { selectUser } from '@/containers/App/selectors';
import { getUserAsync } from '@/containers/App/thunks';

const { Content } = Layout;

export default function App({ children }: { children: React.ReactNode }) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  const dispatch = useDispatch();

  return (
    <Layout className="h-screen w-full" hasSider>
      <Layout className="w-full h-full">
        <Header
          userInfo={{
            avatarUrl: '',
            fullName: 'van thong',
            username: 'abc',
            email: '@gamil',
            userId: 1,
          }}
          collapsedSidebar={collapsedSidebar}
          setCollapsedSidebar={setCollapsedSidebar}
        />
        <Content className="bg-white h-full overflow-auto">{children}</Content>
      </Layout>
    </Layout>
  );
}
