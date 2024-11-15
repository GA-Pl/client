export async function getFeeds(token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await fetch(`/api/feed`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch feeds');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching feeds:', error);
    return null;
  }
}
