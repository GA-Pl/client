export async function getComments(id: string, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await fetch(`http://localhost:3000/api/comment/${id}`, {
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Comments');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching Comments:', error);
    return null;
  }
}
