'use server';

import { cookies } from 'next/headers';

export async function getAdminToken() {
  try {
    let accessToken = cookies().get('access_token')?.value || null;
    const refreshToken = cookies().get('refresh_token')?.value || null;
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('세션 조회 실패:', error);
    throw error;
  }
}
