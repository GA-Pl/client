async function fetchLessonDetail(
  documentId: number | string,
  token: string | undefined,
) {
  const response = await fetch(
    `${process.env.BASE_API}/document/detail/plan?document_id=${documentId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch lesson');
  }

  return response.json();
}

export default fetchLessonDetail;
