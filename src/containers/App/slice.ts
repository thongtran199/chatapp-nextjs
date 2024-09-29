import { getUserAsync } from './thunks';
import { User } from '@/common/models/user';
import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

export interface AppSliceState {
  user: User | null;
  status: ApiStatus;
}

const initialState: AppSliceState = {
  user: null,
  status: ApiStatus.Idle,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setUser(builder);
  },
});

function setUser(builder: ActionReducerMapBuilder<AppSliceState>) {
  builder
    .addCase(getUserAsync.pending, (state: AppSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      getUserAsync.fulfilled,
      (state: AppSliceState, action: PayloadAction<User>) => {
        state.status = ApiStatus.Idle;
        state.user = action.payload;
      },
    )
    .addCase(getUserAsync.rejected, (state: AppSliceState) => {
      state.status = ApiStatus.Failed;
    });
}
