import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'notification';

export const getNotificationsAsync = createAppAsyncThunk(
  `${TypePrefix}/getNotifications`,
  async (userId: number) =>
    await callApi(`notification/user/${userId}`, {
      method: 'GET',
    }),
);

export const deleteNotificationAsync = createAppAsyncThunk(
  `${TypePrefix}/deleteNotification`,
  async (friendshipId: number) => {
    const deleteNotificationResponse = await callApi(
      `notification/${friendshipId}`,
      {
        method: 'DELETE',
      },
    );
    return deleteNotificationResponse;
  },
);
