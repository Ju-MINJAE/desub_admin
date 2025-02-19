export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`${process.env.BASEURL}/api/user/refresh_token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Access token refresh failed:', error);
    return null;
  }
}
