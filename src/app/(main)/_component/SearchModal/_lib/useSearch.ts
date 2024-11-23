import { useQuery } from '@tanstack/react-query';
import { getSearch } from './getSearch';

export const useSearch = (keyword: string, types: string) => {
  return useQuery({
    queryKey: ['search', keyword, types],
    queryFn: () => getSearch(keyword, types),
    enabled: !!keyword && !!types,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
