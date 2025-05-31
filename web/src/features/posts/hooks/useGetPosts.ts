import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/getPosts';

export function useGetPosts(page: number) {
   return useQuery({
      queryKey: ['posts', page],
      queryFn: ({ queryKey }) => {
         const [, pageParam] = queryKey;
         return getPosts(pageParam as number);
      },
      staleTime: 5 * 60 * 1000,
   });
}
