import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_AVATAR_URL,
  USER_FULL_NAME,
  USER_ID_KEY,
} from '@/constants';
import {
  getCookie,
  removeAllCookies,
  removeAllLocalStorage,
  setCookie,
} from '@/utils/cache';

export default class User {
  private static instance: User;
  private constructor() {}

  static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  setAccessToken(token: string) {
    setCookie(ACCESS_TOKEN_KEY, token);
  }

  setRefreshToken(token: string) {
    setCookie(REFRESH_TOKEN_KEY, token);
  }

  setUserId(id: string) {
    setCookie(USER_ID_KEY, id);
  }

  setFullName(fullName: string) {
    setCookie(USER_FULL_NAME, fullName);
  }

  setAvatarUrl(avatarUrl: string) {
    setCookie(USER_AVATAR_URL, avatarUrl);
  }

  getAccessToken() {
    return getCookie(ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    return getCookie(REFRESH_TOKEN_KEY);
  }

  getUserId() {
    return getCookie(USER_ID_KEY);
  }

  getFullName() {
    return getCookie(USER_FULL_NAME);
  }

  getAvatarUrl() {
    return getCookie(USER_AVATAR_URL);
  }

  logout() {
    removeAllCookies();
    removeAllLocalStorage();
  }
}
