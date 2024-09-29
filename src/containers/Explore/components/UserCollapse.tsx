import React from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from '@/lib/redux';
import {
  selectDebouncedInput,
  selectFoundUsers,
  selectStatus,
} from '../selectors';
import { Collapse, Flex, Space, Spin } from 'antd';
import { uniqueId } from 'lodash';
import theme from '@/theme';
import { applyConditionalStyle } from '@/utils/style';
import { FoundUser } from '@/common/models/explore';
import { ApiStatus } from '@/common/enums/apiStatus';
import FoundUserItem from './FoundUserItem';
import { searchUsersByFullNameContainingAsync } from '../thunks';
import User from '@/services/user';

const UserCollapse = () => {
  const t = useTranslations('ExplorePage');
  const foundUserStatus = useSelector(selectStatus);
  const foundUsers = useSelector(selectFoundUsers);
  const debouncedInput = useSelector(selectDebouncedInput);
  const dispatch = useDispatch();

  const getChildren = (): React.ReactNode => {
    if (foundUserStatus === ApiStatus.Loading) {
      return (
        <Flex vertical justify="center" align="center">
          <Spin />
        </Flex>
      );
    } else if (foundUserStatus === ApiStatus.Fulfilled) {
      return (
        <Space direction="vertical" className="w-full" style={{ gap: '0px' }}>
          {foundUsers.map((user: FoundUser, index: number) => (
            <div
              key={uniqueId()}
              className="pl-5"
              style={{
                ...applyConditionalStyle({
                  condition: index % 2 === 0,
                  enhancedStyle: { background: theme.color.lightGray },
                }),
              }}
            >
              <FoundUserItem
                key={uniqueId()}
                user={user}
                callDispatch={() => {
                  dispatch(
                    searchUsersByFullNameContainingAsync({
                      userId: Number(User.getInstance().getUserId()),
                      fullName: debouncedInput,
                    }),
                  );
                }}
              />
            </div>
          ))}
        </Space>
      );
    } else {
      return null;
    }
  };

  const collapseItems: [
    { key: string | number; label: React.ReactNode; children: React.ReactNode },
  ] = [
    {
      key: '1',
      label: <span className="font-semibold">{t('foundUserList')}</span>,
      children: getChildren(),
    },
  ];

  return (
    <Flex wrap="wrap" gap={8}>
      <Collapse
        expandIconPosition="end"
        items={collapseItems}
        defaultActiveKey={['1']}
        className="w-full"
      />
    </Flex>
  );
};

export default UserCollapse;
