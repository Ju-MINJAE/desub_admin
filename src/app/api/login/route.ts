import { NextResponse } from 'next/server';
import { loginAdmin } from '@/api/admin';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const data = await loginAdmin(email, password);

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    response.cookies.set('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' },
      { status: 401 },
    );
  }
}
