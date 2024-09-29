import { ReduxState } from '@/lib/redux';

export const selectUser = (state: ReduxState) => state.app.user;
