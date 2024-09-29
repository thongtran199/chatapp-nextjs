import { useDispatch, useSelector } from '@/lib/redux';
import { Flex, List } from 'antd';
import { useEffect } from 'react';
import { getFriendsAsync } from '../thunks';
import User from '@/services/user';
import { selectFriends } from '../selectors';
import FoundUserItem from '@/containers/Explore/components/FoundUserItem';
import { FoundUser } from '@/common/models/explore';
import { uniqueId } from 'lodash';

const FriendsComponent = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(getFriendsAsync(Number(User.getInstance().getUserId())));
  }, []);

  return (
    <Flex vertical gap={3}>
      {friends.map((friend: FoundUser) => {
        return (
          <FoundUserItem
            key={uniqueId()}
            user={friend}
            callDispatch={() => {
              dispatch(getFriendsAsync(Number(User.getInstance().getUserId())));
            }}
          />
        );
      })}
    </Flex>
  );
};

export default FriendsComponent;
