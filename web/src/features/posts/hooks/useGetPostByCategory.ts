import { useQuery } from '@tanstack/react-query';
import { getPostByCategory } from '../services/getPostByCategory';

export const useGetPostByCategory = (category: string, page: number, sort: string) => {
   return useQuery({
      queryKey: ['category', category, page, sort],
      queryFn: () => getPostByCategory(category, page, sort),
      staleTime: 5 * 60 * 1000,
      enabled: !!category || !!sort,
   });
};
