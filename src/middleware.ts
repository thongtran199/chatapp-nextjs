import { NextRequest, NextResponse } from 'next/server';
import localizationMiddleware from '@/middlewares/localizationMiddleware';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';
import { isTokenExpired, setNewAccessToken } from './utils/token';

export default async function middleware(request: NextRequest) {
  const nextResponse = localizationMiddleware(request);

  const pathRegex = new RegExp(`^\\/(vi|en)\\/$`);

  // if (pathRegex.test(request.nextUrl.pathname)) {
  //   const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  //   const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  //   if (accessToken && !isTokenExpired(accessToken, 5 * 60)) {
  //     return nextResponse;
  //   }

  //   if (refreshToken && !isTokenExpired(refreshToken, 0)) {
  //     const newAccessToken = await setNewAccessToken(refreshToken);
  //     if (newAccessToken) {
  //       nextResponse.cookies.set(ACCESS_TOKEN_KEY, newAccessToken.accessToken);
  //       if (newAccessToken.refreshToken) {
  //         nextResponse.cookies.set(
  //           REFRESH_TOKEN_KEY,
  //           newAccessToken.refreshToken,
  //         );
  //       }
  //       return nextResponse;
  //     }
  //   }
  //   const redirectResponse = NextResponse.redirect(
  //     new URL('/', request.nextUrl.origin),
  //   );
  //   redirectResponse.cookies.delete(ACCESS_TOKEN_KEY);
  //   redirectResponse.cookies.delete(REFRESH_TOKEN_KEY);

  //   return redirectResponse;
  // }

  return nextResponse;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*'],
};
