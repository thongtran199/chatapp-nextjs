import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'explore';

export const searchUsersByFullNameContainingAsync = createAppAsyncThunk(
  `${TypePrefix}/searchUsersByFullNameContaining`,
  async (fullName: string) =>
    await callApi(`user/search?fullName=${fullName}`, {
      method: 'GET',
    }),
);
