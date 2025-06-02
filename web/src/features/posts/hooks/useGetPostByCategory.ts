import { useQuery } from '@tanstack/react-query';
import { getPostByCategory } from '../services/getPostByCategory';

export const useGetPostByCategory = (category: string) => {
   return useQuery({
      queryKey: ['category', category],
      queryFn: () => getPostByCategory(category),
      staleTime: 5 * 60 * 1000,
   });
};
