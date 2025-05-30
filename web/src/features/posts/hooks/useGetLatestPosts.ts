import { useQuery } from '@tanstack/react-query';
import { getLatestPosts } from '../services/getLatestPosts';

export const useGetLatestPosts = () => {
   return useQuery({
      queryKey: ['latest_posts'],
      queryFn: getLatestPosts,
      staleTime: 3 * 60 * 1000,
   });
};
