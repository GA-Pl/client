import { BASE_NEXT_URL } from '@/_lib/utils/config';

export async function getDrafts(token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await fetch(`${BASE_NEXT_URL}/api/draft`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch drafts');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    return null;
  }
}
