import { AddFriendRequest } from '@/common/models/friend';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'friend';

export const getFriendsAsync = createAppAsyncThunk(
  `${TypePrefix}/getFriends`,
  async (userId: number) =>
    await callApi(`friendship/friends/${userId}`, {
      method: 'GET',
    }),
);
export const getSentFriendsAsync = createAppAsyncThunk(
  `${TypePrefix}/getSentFriends`,
  async (userId: number) =>
    await callApi(`friendship/sent/${userId}`, {
      method: 'GET',
    }),
);

export const getReceivedFriendRequestsAsync = createAppAsyncThunk(
  `${TypePrefix}/getReceivedFriends`,
  async (userId: number) =>
    await callApi(`friendship/received/${userId}`, {
      method: 'GET',
    }),
);

export const acceptFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/acceptFriendRequest`,
  async (friendshipId: number) => {
    const acceptFriendRequestResponse = await callApi(
      `friendship/accept/${friendshipId}`,
      {
        method: 'POST',
      },
    );
    return acceptFriendRequestResponse;
  },
);

export const declineFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/declineFriendRequest`,
  async (friendshipId: number) => {
    const declineFriendRequestResponse = await callApi(
      `friendship/decline/${friendshipId}`,
      {
        method: 'POST',
      },
    );
    return declineFriendRequestResponse;
  },
);

export const sendFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/sendFriendRequest`,
  async (addFriendRequest: AddFriendRequest) => {
    const sendFriendRequestResponse = await callApi(
      `friendship/send-friend-request`,
      {
        method: 'POST',
        body: JSON.stringify(addFriendRequest),
      },
    );
    return sendFriendRequestResponse;
  },
);

export const revokeFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/revokeFriendRequest`,
  async (friendshipId: number) => {
    const revokeFriendRequestResponse = await callApi(
      `friendship/revoke/${friendshipId}`,
      {
        method: 'POST',
      },
    );
    return revokeFriendRequestResponse;
  },
);

export const unFriendAsync = createAppAsyncThunk(
  `${TypePrefix}/unFriend`,
  async ({ userId1, userId2 }: { userId1: number; userId2: number }) => {
    const unFriendResponse = await callApi(
      `friendship/unfriend/${userId1}/${userId2}`,
      {
        method: 'POST',
      },
    );
    return unFriendResponse;
  },
);
