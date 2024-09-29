import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { FoundUser } from '@/common/models/explore';
import { searchUsersByFullNameContainingAsync } from './thunks';

export interface ExploreSliceState {
  status: ApiStatus;
  foundUsers: FoundUser[];
  debouncedInput: string;
}

const initialState: ExploreSliceState = {
  status: ApiStatus.Idle,
  foundUsers: [],
  debouncedInput: '',
};

export const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    setIdleStatus(state) {
      state.status = ApiStatus.Idle;
    },
    setEmptyFoundUsers(state) {
      state.foundUsers = [];
    },
    setDebouncedInputInSlice(state, action: PayloadAction<string>) {
      state.debouncedInput = action.payload;
    },
  },
  extraReducers(builder) {
    findFriendsByUsernameOrEmail(builder);
  },
});

export const { setIdleStatus, setEmptyFoundUsers, setDebouncedInputInSlice } =
  exploreSlice.actions;

function findFriendsByUsernameOrEmail(
  builder: ActionReducerMapBuilder<ExploreSliceState>,
) {
  builder
    .addCase(
      searchUsersByFullNameContainingAsync.pending,
      (state: ExploreSliceState) => {
        state.status = ApiStatus.Loading;
      },
    )
    .addCase(
      searchUsersByFullNameContainingAsync.fulfilled,
      (state: ExploreSliceState, action: PayloadAction<FoundUser[]>) => {
        state.foundUsers = action.payload;
        state.status = ApiStatus.Fulfilled;
      },
    )
    .addCase(
      searchUsersByFullNameContainingAsync.rejected,
      (state: ExploreSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}
