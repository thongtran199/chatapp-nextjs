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

export const getDeclinedFriendsAsync = createAppAsyncThunk(
  `${TypePrefix}/getDeclinedFriends`,
  async (userId: number) =>
    await callApi(`friendship/declined/${userId}`, {
      method: 'GET',
    }),
);

export const acceptFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/acceptFriendRequest`,
  async ({
    requesterId,
    requestedUserId,
  }: {
    requesterId: number;
    requestedUserId: number;
  }) => {
    const registerResponse = await callApi(
      `friendship/accept/${requesterId}/${requestedUserId}`,
      {
        method: 'POST',
      },
    );
    return registerResponse;
  },
);

export const declineFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/declineFriendRequest`,
  async ({
    requesterId,
    requestedUserId,
  }: {
    requesterId: number;
    requestedUserId: number;
  }) => {
    const registerResponse = await callApi(
      `friendship/decline/${requesterId}/${requestedUserId}`,
      {
        method: 'POST',
      },
    );
    return registerResponse;
  },
);

export const sendFriendRequestAsync = createAppAsyncThunk(
  `${TypePrefix}/sendFriendRequest`,
  async (addFriendRequest: AddFriendRequest) => {
    const sendFriendRequestResponse = await callApi(`friendship/request`, {
      method: 'POST',
      body: JSON.stringify(addFriendRequest),
    });
    return sendFriendRequestResponse;
  },
);
