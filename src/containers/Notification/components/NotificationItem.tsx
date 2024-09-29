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
import { useDispatch } from '@/lib/redux';
import { Notification } from '@/common/models/notification';
import { deleteNotificationAsync, getNotificationsAsync } from '../thunks';
import { DatetimeFormat, formatDate } from '@/utils/date';
const { Text } = Typography;

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const dispatch = useDispatch();
  const handleDeleteNotification = async () => {
    const resultAction = await dispatch(
      deleteNotificationAsync(notification.notificationId),
    );
    if (deleteNotificationAsync.fulfilled.match(resultAction)) {
      dispatch(getNotificationsAsync(Number(User.getInstance().getUserId())));
    }
  };

  const actions = () => {
    return (
      <Button
        type="primary"
        className="min-w-36"
        onClick={handleDeleteNotification}
      >
        Xóa thông báo
      </Button>
    );
  };
  return (
    <Flex align="center" justify="space-between" className="py-3 px-3">
      <Flex>
        <Flex vertical className="ml-7">
          <Text strong>{notification.type}</Text>
          <Text type="secondary">
            {formatDate(notification.createdAt, DatetimeFormat)}
          </Text>
        </Flex>
      </Flex>
      <Flex vertical className="self-end">
        {actions()}
      </Flex>
    </Flex>
  );
};

export default NotificationItem;
