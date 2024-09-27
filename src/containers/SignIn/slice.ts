import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { signInAsync } from './thunks';
import User from '@/services/user';
import { LoginResponse } from '@/common/models/signIn';

export interface SignInSliceState {
  status: ApiStatus;
  errorMessage: string;
}

const initialState: SignInSliceState = {
  status: ApiStatus.Idle,
  errorMessage: '',
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setSignIn(builder);
  },
});

function setSignIn(builder: ActionReducerMapBuilder<SignInSliceState>) {
  builder
    .addCase(signInAsync.pending, (state: SignInSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      signInAsync.fulfilled,
      (state: SignInSliceState, action: PayloadAction<LoginResponse>) => {
        state.status = ApiStatus.Fulfilled;
        const registerResponse = action.payload;
        User.getInstance().setAccessToken(registerResponse.accessToken);
        User.getInstance().setRefreshToken(registerResponse.refreshToken ?? '');
        User.getInstance().setUserId(registerResponse.user.userId.toString());
        User.getInstance().setAvatarUrl(registerResponse.user.avatarUrl ?? '');
        User.getInstance().setFullName(registerResponse.user.fullName);
      },
    )
    .addCase(signInAsync.rejected, (state: SignInSliceState, action) => {
      state.status = ApiStatus.Failed;
      const errorMessage =
        action.error.message ||
        (action.payload && (action.payload as any).message) ||
        'Đăng nhập thất bại';

      state.errorMessage = errorMessage;
    });
}
