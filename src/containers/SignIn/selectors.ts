import { ReduxState } from '@/lib/redux';

export const selectCurrentSignInStatus = (state: ReduxState) =>
  state.signIn.status;

export const selectErrorMessage = (state: ReduxState) =>
  state.signIn.errorMessage;
