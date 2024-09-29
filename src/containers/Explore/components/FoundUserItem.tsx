import React from 'react';
import { Avatar, Button, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FoundUser } from '@/common/models/explore';
import {
  acceptFriendRequestAsync,
  declineFriendRequestAsync,
  revokeFriendRequestAsync,
  sendFriendRequestAsync,
  unFriendAsync,
} from '@/containers/Friend/thunks';
import { AddFriendRequest } from '@/common/models/friend';
import User from '@/services/user';
import { FriendshipStatus } from '@/common/enums/friendshipStatus';
import useFriendshipDispatch from '../hooks/useFriendDispatch';

const { Text } = Typography;

interface FoundUserItemProps {
  user: FoundUser;
  callDispatch: any;
}

const FoundUserItem: React.FC<FoundUserItemProps> = ({
  user,
  callDispatch,
}: {
  user: FoundUser;
  callDispatch: any;
}) => {
  const { executeAction } = useFriendshipDispatch();

  const handleSendFriendRequest = async () => {
    const addFriendRequest: AddFriendRequest = {
      requesterId: Number(User.getInstance().getUserId()),
      requestedUserId: user.userId,
    };
    executeAction(sendFriendRequestAsync, addFriendRequest, callDispatch);
  };

  const handleAcceptFriendRequest = async () => {
    if (!user.friendshipFoundUserResponseDTO) return;
    executeAction(
      acceptFriendRequestAsync,
      user.friendshipFoundUserResponseDTO.friendshipId,
      callDispatch,
    );
  };

  const handleDeclineFriendRequest = async () => {
    if (!user.friendshipFoundUserResponseDTO) return;
    executeAction(
      declineFriendRequestAsync,
      user.friendshipFoundUserResponseDTO.friendshipId,
      callDispatch,
    );
  };

  const handleRevokeFriendRequest = async () => {
    if (!user.friendshipFoundUserResponseDTO) return;
    executeAction(
      revokeFriendRequestAsync,
      user.friendshipFoundUserResponseDTO.friendshipId,
      callDispatch,
    );
  };

  const handleUnfriend = async () => {
    executeAction(
      unFriendAsync,
      {
        userId1: user.userId,
        userId2: Number(User.getInstance().getUserId()),
      },
      callDispatch,
    );
  };

  const actions = () => {
    if (!user.friendshipFoundUserResponseDTO) {
      return (
        <Button
          type="primary"
          className="min-w-36"
          onClick={handleSendFriendRequest}
        >
          Thêm bạn bè
        </Button>
      );
    } else if (
      user.friendshipFoundUserResponseDTO.friendshipStatus ===
        FriendshipStatus.UNFRIEND ||
      user.friendshipFoundUserResponseDTO.friendshipStatus ===
        FriendshipStatus.REVOKED ||
      user.friendshipFoundUserResponseDTO.friendshipStatus ===
        FriendshipStatus.DECLINED
    ) {
      return (
        <Button
          type="primary"
          className="min-w-36"
          onClick={handleSendFriendRequest}
        >
          Thêm bạn bè
        </Button>
      );
    } else if (
      user.friendshipFoundUserResponseDTO.friendshipStatus ===
        FriendshipStatus.PENDING &&
      user.friendshipFoundUserResponseDTO.requesterId !==
        Number(User.getInstance().getUserId())
    ) {
      return (
        <Flex gap={3}>
          <Button className="min-w-36" onClick={handleDeclineFriendRequest}>
            Từ chối
          </Button>
          <Button
            type="primary"
            className="min-w-36"
            onClick={handleAcceptFriendRequest}
          >
            Chấp nhận
          </Button>
        </Flex>
      );
    } else if (
      user.friendshipFoundUserResponseDTO.friendshipStatus ===
        FriendshipStatus.PENDING &&
      user.friendshipFoundUserResponseDTO.requesterId ===
        Number(User.getInstance().getUserId())
    ) {
      return (
        <Button onClick={handleRevokeFriendRequest} className="min-w-36">
          Hủy lời mời
        </Button>
      );
    } else if (
      user.friendshipFoundUserResponseDTO.friendshipStatus ===
      FriendshipStatus.ACCEPTED
    ) {
      return (
        <Button className="min-w-36" onClick={handleUnfriend}>
          Hủy kết bạn
        </Button>
      );
    }

    return null;
  };

  return (
    <Flex align="center" justify="space-between" className="py-3 px-3">
      <Flex>
        <Avatar
          src={user.avatarUrl || undefined}
          icon={!user.avatarUrl ? <UserOutlined /> : null}
          size={48}
        />
        <Flex vertical className="ml-7">
          <Text strong>{user.fullName}</Text>
          <Text type="secondary">{user.username}</Text>
        </Flex>
      </Flex>
      <Flex vertical className="self-end">
        {actions()}
      </Flex>
    </Flex>
  );
};

export default FoundUserItem;
