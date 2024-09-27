import { SignInRequest } from '@/common/models/signIn';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'user';

export const signInAsync = createAppAsyncThunk(
  `${TypePrefix}/signIn`,
  async (signInRequest: SignInRequest) => {
    const loginResponse = await callApi(
      'auth/signIn',
      {
        method: 'POST',
        body: JSON.stringify(signInRequest),
      },
      false,
    );
    return loginResponse;
  },
);
