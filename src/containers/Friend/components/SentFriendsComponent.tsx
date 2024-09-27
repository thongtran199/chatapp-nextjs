import { useDispatch, useSelector } from '@/lib/redux';
import { List } from 'antd';
import { useEffect } from 'react';
import { selectSentFriends } from '../selectors';
import { getSentFriendsAsync } from '../thunks';
import User from '@/services/user';

const SentFriendsComponent = () => {
  const dispatch = useDispatch();
  const sentFriends = useSelector(selectSentFriends);

  useEffect(() => {
    dispatch(getSentFriendsAsync(Number(User.getInstance().getUserId())));
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={sentFriends}
      renderItem={(friend) => (
        <List.Item>
          <List.Item.Meta
            title={friend.fullName}
            description={friend.username}
            avatar={
              <img
                src={friend.avatarUrl}
                alt={friend.fullName}
                style={{ width: 40, borderRadius: '50%' }}
              />
            }
          />
        </List.Item>
      )}
    />
  );
};

export default SentFriendsComponent;
