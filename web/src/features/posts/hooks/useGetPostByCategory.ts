import { useQuery } from '@tanstack/react-query';
import { getPostByCategory } from '../services/getPostByCategory';

export const useGetPostByCategory = (category: string, page: number) => {
   return useQuery({
      queryKey: ['category', category, page],
      queryFn: () => getPostByCategory(category, page),
      staleTime: 5 * 60 * 1000,
      enabled: !!category,
   });
};
