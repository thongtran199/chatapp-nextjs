import { Flex, List } from 'antd';
import { useDispatch, useSelector } from '@/lib/redux';
import { useEffect } from 'react';
import { getReceivedFriendRequestsAsync } from '../thunks';
import User from '@/services/user';
import { selectReceivedFriendRequests } from '../selectors';
import FoundUserItem from '@/containers/Explore/components/FoundUserItem';
import { FoundUser } from '@/common/models/explore';
import { uniqueId } from 'lodash';
const ReceivedFriendRequestsComponent = () => {
  const dispatch = useDispatch();
  const receivedFriendRequests = useSelector(selectReceivedFriendRequests);

  useEffect(() => {
    dispatch(
      getReceivedFriendRequestsAsync(Number(User.getInstance().getUserId())),
    );
  }, []);

  return (
    <Flex vertical gap={3}>
      {receivedFriendRequests.map((friend: FoundUser) => {
        return (
          <FoundUserItem
            key={uniqueId()}
            user={friend}
            callDispatch={() =>
              dispatch(
                getReceivedFriendRequestsAsync(
                  Number(User.getInstance().getUserId()),
                ),
              )
            }
          />
        );
      })}
    </Flex>
  );
};

export default ReceivedFriendRequestsComponent;
