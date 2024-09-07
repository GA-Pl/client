async function fetchFeeds() {
  const response = await fetch(`/dummyFeeds.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  return response.json();
}

export default fetchFeeds;
