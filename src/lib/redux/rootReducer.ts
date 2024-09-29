import { signUpSlice } from '@/containers/SignUp/slice';
import { signInSlice } from '@/containers/SignIn/slice';
import { friendSlice } from '@/containers/Friend/slice';
import { exploreSlice } from '@/containers/Explore/slice';
import { chatSlice } from '@/containers/Chat/slice';
import { appSlice } from '@/containers/App/slice';
import { notificationSlice } from '@/containers/Notification/slice';
export const reducer = {
  app: appSlice.reducer,
  signUp: signUpSlice.reducer,
  signIn: signInSlice.reducer,
  friend: friendSlice.reducer,
  chat: chatSlice.reducer,
  explore: exploreSlice.reducer,
  notification: notificationSlice.reducer,
};
