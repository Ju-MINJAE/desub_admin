import { NextResponse, type NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const isAuthenticated = refreshToken && refreshToken.trim() !== '';

  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/login';

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
