import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { Friend } from '@/common/models/friend';
import {
  acceptFriendRequestAsync,
  declineFriendRequestAsync,
  getDeclinedFriendsAsync,
  getFriendsAsync,
  getSentFriendsAsync,
  sendFriendRequestAsync,
} from './thunks';

export interface FriendSliceState {
  acceptStatus: ApiStatus;
  declineStatus: ApiStatus;
  sendFriendRequestStatus: ApiStatus;
  friends: Friend[];
  sentFriends: Friend[];
  declinedFriends: Friend[];
}

const initialState: FriendSliceState = {
  acceptStatus: ApiStatus.Idle,
  declineStatus: ApiStatus.Idle,
  sendFriendRequestStatus: ApiStatus.Idle,
  friends: [],
  sentFriends: [],
  declinedFriends: [],
};

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers(builder) {
    setFriends(builder);
    setSentFriends(builder);
    setDeclinedFriends(builder);
    acceptFriendRequest(builder);
    declineFriendRequest(builder);
    sendFriendRequest(builder);
  },
});

function setFriends(builder: ActionReducerMapBuilder<FriendSliceState>) {
  builder.addCase(
    getFriendsAsync.fulfilled,
    (state: FriendSliceState, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
  );
}

function setSentFriends(builder: ActionReducerMapBuilder<FriendSliceState>) {
  builder.addCase(
    getSentFriendsAsync.fulfilled,
    (state: FriendSliceState, action: PayloadAction<Friend[]>) => {
      state.sentFriends = action.payload;
    },
  );
}

function setDeclinedFriends(
  builder: ActionReducerMapBuilder<FriendSliceState>,
) {
  builder.addCase(
    getDeclinedFriendsAsync.fulfilled,
    (state: FriendSliceState, action: PayloadAction<Friend[]>) => {
      state.declinedFriends = action.payload;
    },
  );
}

function acceptFriendRequest(
  builder: ActionReducerMapBuilder<FriendSliceState>,
) {
  builder
    .addCase(acceptFriendRequestAsync.pending, (state: FriendSliceState) => {
      state.acceptStatus = ApiStatus.Loading;
    })
    .addCase(acceptFriendRequestAsync.fulfilled, (state: FriendSliceState) => {
      state.acceptStatus = ApiStatus.Fulfilled;
    })
    .addCase(acceptFriendRequestAsync.rejected, (state: FriendSliceState) => {
      state.acceptStatus = ApiStatus.Failed;
    });
}

function declineFriendRequest(
  builder: ActionReducerMapBuilder<FriendSliceState>,
) {
  builder
    .addCase(declineFriendRequestAsync.pending, (state: FriendSliceState) => {
      state.declineStatus = ApiStatus.Loading;
    })
    .addCase(declineFriendRequestAsync.fulfilled, (state: FriendSliceState) => {
      state.declineStatus = ApiStatus.Fulfilled;
    })
    .addCase(declineFriendRequestAsync.rejected, (state: FriendSliceState) => {
      state.declineStatus = ApiStatus.Failed;
    });
}

function sendFriendRequest(builder: ActionReducerMapBuilder<FriendSliceState>) {
  builder
    .addCase(sendFriendRequestAsync.pending, (state: FriendSliceState) => {
      state.sendFriendRequestStatus = ApiStatus.Loading;
    })
    .addCase(sendFriendRequestAsync.fulfilled, (state: FriendSliceState) => {
      state.sendFriendRequestStatus = ApiStatus.Fulfilled;
    })
    .addCase(sendFriendRequestAsync.rejected, (state: FriendSliceState) => {
      state.sendFriendRequestStatus = ApiStatus.Failed;
    });
}
