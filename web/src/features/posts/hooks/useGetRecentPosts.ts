import { useQuery } from '@tanstack/react-query';
import { getRecentPosts } from '../services/getRecentPosts';

export const useGetRecentPosts = () => {
   return useQuery({
      queryKey: ['recent_posts'],
      queryFn: getRecentPosts,
      staleTime: 3 * 60 * 1000,
   });
};
