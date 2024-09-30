import { SignInRequest } from '@/common/models/signIn';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'auth';

export const signInAsync = createAppAsyncThunk(
  `${TypePrefix}/login`,
  async (signInRequest: SignInRequest) => {
    const loginResponse = await callApi(
      'auth/login',
      {
        method: 'POST',
        body: JSON.stringify(signInRequest),
      },
      false,
    );
    return loginResponse;
  },
);
