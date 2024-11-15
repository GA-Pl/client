// src/_lib/searchAPI.ts

import { BASE_NEXT_URL } from '@/_lib/utils/config';

export async function fetchSearchResults(
  keyword: string,
  types: string,
  token: string,
) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${BASE_NEXT_URL}/document/search?keyword=${keyword}&types=${types}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  return response.json();
}
