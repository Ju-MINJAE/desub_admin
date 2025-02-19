const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export const loginAdmin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/user/login/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '로그인에 실패했습니다');
  }

  return data;
};
