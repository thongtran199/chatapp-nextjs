import { signUpSlice } from '@/containers/SignUp/slice';
import { signInSlice } from '@/containers/SignIn/slice';
import { friendSlice } from '@/containers/Friend/slice';
import { exploreSlice } from '@/containers/Explore/slice';
import { chatSlice } from '@/containers/Chat/slice';
export const reducer = {
  signUp: signUpSlice.reducer,
  signIn: signInSlice.reducer,
  friend: friendSlice.reducer,
  chat: chatSlice.reducer,
  explore: exploreSlice.reducer,
};
