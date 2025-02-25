import { NextResponse, type NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  // console.log('Middleware executing for path:', request.nextUrl.pathname);
  const refreshToken = request.cookies.get('refresh_token')?.value;
  // console.log('Refresh token:', refreshToken);
  const isAuthenticated = refreshToken && refreshToken.trim() !== '';
  // console.log('isAuthenticated:', isAuthenticated);

  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/login';

  if (!isAuthenticated && !isLoginPage) {
    // console.log('Redirecting to login page');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isLoginPage) {
    // console.log('Redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuthenticated && request.nextUrl.pathname !== '/login') {
    // console.log('Keeping at login page');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
