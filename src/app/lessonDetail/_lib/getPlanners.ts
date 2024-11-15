export async function getPlanners(id: string, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(`/api/document/lessonDetail/${id}`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Planners');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching Planners:', error);
    return null;
  }
}
