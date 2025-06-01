import { useQuery } from '@tanstack/react-query';
import { viewSinglePost } from '../services/viewSinglePost';

export function useViewSinglePost(slug: string) {
   return useQuery({
      queryKey: ['single_post', slug],
      queryFn: viewSinglePost,
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
   });
}
