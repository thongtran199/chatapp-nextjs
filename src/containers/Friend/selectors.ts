import { ReduxState } from '@/lib/redux';

export const selectFriends = (state: ReduxState) => state.friend.friends;

export const selectSentFriends = (state: ReduxState) =>
  state.friend.sentFriends;

export const selectDeclinedFriends = (state: ReduxState) =>
  state.friend.declinedFriends;

export const selectAcceptStatus = (state: ReduxState) =>
  state.friend.acceptStatus;

export const selectDeclineStatus = (state: ReduxState) =>
  state.friend.declineStatus;
