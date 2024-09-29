import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'user';

export const getUserAsync = createAppAsyncThunk(
  `${TypePrefix}/getUser`,
  async () => await callApi('users/get-me'),
);
