import { ApiStatus } from '@/common/enums/apiStatus';
import { RegisterResponse } from '@/common/models/signUp';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { signUpAsync } from './thunks';
import User from '@/services/user';

export interface SignUpSliceState {
  status: ApiStatus;
}

const initialState: SignUpSliceState = {
  status: ApiStatus.Idle,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setSignUp(builder);
  },
});

function setSignUp(builder: ActionReducerMapBuilder<SignUpSliceState>) {
  builder
    .addCase(signUpAsync.pending, (state: SignUpSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      signUpAsync.fulfilled,
      (state: SignUpSliceState, action: PayloadAction<RegisterResponse>) => {
        state.status = ApiStatus.Fulfilled;
        const registerResponse = action.payload;
        User.getInstance().setAccessToken(registerResponse.accessToken);
        User.getInstance().setRefreshToken(registerResponse.refreshToken ?? '');
        User.getInstance().setUserId(registerResponse.user.userId.toString());
        User.getInstance().setAvatarUrl(registerResponse.user.avatarUrl ?? '');
        User.getInstance().setFullName(registerResponse.user.fullName);
      },
    )
    .addCase(signUpAsync.rejected, (state: SignUpSliceState) => {
      state.status = ApiStatus.Failed;
    });
}
