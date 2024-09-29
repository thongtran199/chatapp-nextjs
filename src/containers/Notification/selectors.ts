import { ReduxState } from '@/lib/redux';

export const selectNotifications = (state: ReduxState) =>
  state.notification.notifications;
