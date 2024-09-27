import React from 'react';
import { Avatar, Button, Flex, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FoundUser } from '@/common/models/explore';
import { useDispatch } from '@/lib/redux';
import {
  acceptFriendRequestAsync,
  declineFriendRequestAsync,
  sendFriendRequestAsync,
} from '@/containers/Friend/thunks';
import { AddFriendRequest } from '@/common/models/friend';
import User from '@/services/user';
import { FriendshipStatus } from '@/common/enums/friendshipStatus';

const { Text } = Typography;

interface FoundUserItemProps {
  user: FoundUser;
}

const FoundUserItem: React.FC<FoundUserItemProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendFriendRequest = () => {
    const addFriendRequest: AddFriendRequest = {
      requesterId: Number(User.getInstance().getUserId()),
      requestedUserId: user.userId,
    };
    dispatch(sendFriendRequestAsync(addFriendRequest));
  };

  const handleAcceptFriendRequest = () => {
    const acceptFriendRequest = {
      requesterId: user.userId,
      requestedUserId: Number(User.getInstance().getUserId()),
    };
    dispatch(acceptFriendRequestAsync(acceptFriendRequest));
  };

  const handleDeclineFriendRequest = () => {
    const declineFriendRequest = {
      requesterId: user.userId,
      requestedUserId: Number(User.getInstance().getUserId()),
    };
    dispatch(declineFriendRequestAsync(declineFriendRequest));
  };

  const actions = () => {
    if (user.friendshipStatus === FriendshipStatus.NONE) {
      return (
        <Button type="primary" onClick={handleSendFriendRequest}>
          Thêm bạn bè
        </Button>
      );
    } else if (
      user.friendshipStatus === FriendshipStatus.PENDING &&
      user.requesterId != Number(User.getInstance().getUserId())
    ) {
      return (
        <Flex gap={3}>
          <Button type="primary" onClick={handleDeclineFriendRequest}>
            Từ chối
          </Button>
          <Button type="primary" onClick={handleAcceptFriendRequest}>
            Chấp nhận
          </Button>
        </Flex>
      );
    } else {
      return null;
    }
  };

  return (
    <Space
      direction="horizontal"
      align="center"
      className="found-user-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #f0f0f0',
        width: '100%',
      }}
    >
      <Space direction="horizontal" align="center" size={16}>
        <Avatar
          src={user.avatarUrl || undefined}
          icon={!user.avatarUrl ? <UserOutlined /> : null}
          size={48}
        />
        <Space direction="vertical">
          <Text strong>{user.fullName}</Text>
          <Text type="secondary">@{user.username}</Text>
        </Space>
        {actions()}
      </Space>
    </Space>
  );
};

export default FoundUserItem;
