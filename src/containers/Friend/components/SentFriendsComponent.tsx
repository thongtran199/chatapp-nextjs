import { useDispatch, useSelector } from '@/lib/redux';
import { Flex } from 'antd';
import { useEffect } from 'react';
import { selectSentFriends } from '../selectors';
import { getSentFriendsAsync } from '../thunks';
import User from '@/services/user';
import { FoundUser } from '@/common/models/explore';
import { uniqueId } from 'lodash';
import FoundUserItem from '@/containers/Explore/components/FoundUserItem';

const SentFriendsComponent = () => {
  const dispatch = useDispatch();
  const sentFriends = useSelector(selectSentFriends);

  useEffect(() => {
    dispatch(getSentFriendsAsync(Number(User.getInstance().getUserId())));
  }, []);

  return (
    <Flex vertical gap={3}>
      {sentFriends.map((friend: FoundUser) => {
        return (
          <FoundUserItem
            key={uniqueId()}
            user={friend}
            callDispatch={() =>
              dispatch(
                getSentFriendsAsync(Number(User.getInstance().getUserId())),
              )
            }
          />
        );
      })}
    </Flex>
  );
};

export default SentFriendsComponent;
