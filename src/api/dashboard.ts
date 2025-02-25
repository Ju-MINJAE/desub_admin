import { DashboardResponse } from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const dashboardAdmin = async (accessToken: string): Promise<DashboardResponse> => {
  const response = await fetch(`${API_URL}/api/admin/dashboard/`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
