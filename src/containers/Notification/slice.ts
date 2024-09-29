import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { getNotificationsAsync } from './thunks';
import { Notification } from '@/common/models/notification';

export interface NotificationSliceState {
  notifications: Notification[];
}

const initialState: NotificationSliceState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers(builder) {
    setNotifications(builder);
  },
});

function setNotifications(
  builder: ActionReducerMapBuilder<NotificationSliceState>,
) {
  builder.addCase(
    getNotificationsAsync.fulfilled,
    (state: NotificationSliceState, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
  );
}
