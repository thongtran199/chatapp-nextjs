import { ReduxState } from '@/lib/redux';

export const selectCurrentSignUpStatus = (state: ReduxState) =>
  state.signUp.status;
