'use server';

import { refreshAccessToken } from '@/lib/auth/refreshToken';
import { cookies } from 'next/headers';

export async function getAccessToken() {
  try {
    let accessToken = cookies().get('access_token')?.value || null;
    const refreshToken = cookies().get('refresh_token')?.value || null;

    if (!accessToken && refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        cookies().set('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 5 * 60,
        });
        accessToken = newAccessToken;
      }
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('세션 조회 실패:', error);
    throw error;
  }
}
