import { BASE_NEXT_URL } from '@/_lib/utils/config';
import axios from 'axios';

interface SearchResult {
  id: number;
  title: string;
  content: string;
}

interface SearchResponse {
  status: string;
  data: {
    user_result: SearchResult[];
    log_result: SearchResult[];
    plan_result: SearchResult[];
  };
}

export const getSearch = async (
  keyword: string,
  types: string,
): Promise<SearchResponse> => {
  if (!keyword || !types) {
    throw new Error('Both keyword and types are required');
  }

  const response = await axios.get<SearchResponse>(
    `${BASE_NEXT_URL}/api/search`,
    {
      params: {
        keyword,
        types,
      },
    },
  );

  return response.data;
};
