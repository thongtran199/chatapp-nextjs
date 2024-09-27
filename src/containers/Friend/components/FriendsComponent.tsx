import { useDispatch, useSelector } from '@/lib/redux';
import { List } from 'antd';
import { useEffect } from 'react';
import { getFriendsAsync } from '../thunks';
import User from '@/services/user';
import { selectFriends } from '../selectors';

const FriendsComponent = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(getFriendsAsync(Number(User.getInstance().getUserId())));
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={friends}
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

export default FriendsComponent;
