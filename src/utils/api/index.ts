import { defaultLocale } from '@/config/locale';
import { isServer } from '@/utils/server';
import User from '@/services/user';
import { ApiError } from '@/common/models/apiError';
import { BASE_API_URL } from '@/utils/environment';

const accessDeniedUrl = `/${defaultLocale}/access-denied`;

export default async function callApi(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any = {},
  needAuthentication = true,
) {
  const url = `${BASE_API_URL}${path}`;
  options.headers = await buildHeaders(options, needAuthentication);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildHeaders(options: any, needAuthentication: boolean) {
  const accessToken = await User.getInstance().getAccessToken();

  const headers: { [key: string]: string } = {
    ...(needAuthentication ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  if (options.contentType !== 'multipart/form-data') {
    headers['Content-Type'] = options.contentType
      ? options.contentType
      : 'application/json';
  }

  headers.Accept = options && options.accept ? options.accept : '*/*';

  return headers;
}

async function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  if (response.status === 200 || response.status === 201) {
    if (response.headers.get('Content-Type') === 'text/csv;charset=utf-8') {
      return response.text();
    }
    return response.json().catch(() => {});
  }

  return response;
}

async function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const responseBody = await response.json();
  const error: ApiError = {
    code: responseBody.code,
    message: responseBody.message,
    httpStatusCode: response.status,
  };

  throw error;
}

function handleError(error: ApiError) {
  if (!isServer() && error.httpStatusCode === 403) {
    window.location.href = accessDeniedUrl;
  }

  throw error;
}
