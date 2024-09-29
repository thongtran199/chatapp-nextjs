import { ReduxState } from '@/lib/redux';

export const selectFoundUsers = (state: ReduxState) => state.explore.foundUsers;

export const selectStatus = (state: ReduxState) => state.explore.status;

export const selectDebouncedInput = (state: ReduxState) =>
  state.explore.debouncedInput;
