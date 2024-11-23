import { BASE_NEXT_URL } from '@/_lib/utils/config';

export async function getPlan(token: string, id: number) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(`${BASE_NEXT_URL}/api/profile/getMyPlan/${id}`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch My Plans');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching My Plans:', error);
    return null;
  }
}
