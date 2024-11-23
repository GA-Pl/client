import { BASE_NEXT_URL } from '@/_lib/utils/config';

export async function getUserInfo(id: number, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(`${BASE_NEXT_URL}/api/profile/getUserInfo/${id}`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}
