import { useQuery } from '@tanstack/react-query';
import { getFeatured } from '../services/getFeatured';

export const useGetFeatured = () => {
   return useQuery({
      queryKey: ['featured_post'],
      queryFn: getFeatured,
      staleTime: 3 * 60 * 1000,
   });
};
