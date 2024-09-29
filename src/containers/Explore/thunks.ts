import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'explore';

export const searchUsersByFullNameContainingAsync = createAppAsyncThunk(
  `${TypePrefix}/searchUsersByFullNameContaining`,
  async ({ fullName, userId }: { fullName: string; userId: number }) =>
    await callApi(`user/search?fullName=${fullName}&userId=${userId}`, {
      method: 'GET',
    }),
);
