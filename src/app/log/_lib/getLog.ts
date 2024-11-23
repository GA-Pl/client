import { BASE_NEXT_URL } from '@/_lib/utils/config';

export async function getLog(id: number, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    console.log('===id');
    console.log(id);
    console.log('===token');
    console.log(token);
    const res = await fetch(`${BASE_NEXT_URL}/api/log/${id}`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch log');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching Planners:', error);
    return null;
  }
}
