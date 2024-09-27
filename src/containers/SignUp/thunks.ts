import { AccountSignUp } from '@/common/models/signUp';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'user';

export const signUpAsync = createAppAsyncThunk(
  `${TypePrefix}/signUp`,
  async (account: AccountSignUp) => {
    const registerResponse = await callApi(
      'auth/signUp',
      {
        method: 'POST',
        body: JSON.stringify(account),
      },
      false,
    );
    return registerResponse;
  },
);
