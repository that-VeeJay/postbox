import { useQuery } from '@tanstack/react-query';

export function useGetPosts(page: number) {
   return useQuery({
      queryKey: ['posts', page],
      queryFn: async () => {
         await new Promise((resolve) => setTimeout(resolve, 300));

         const response = await fetch(`/api/posts?page=${page}`);
         if (!response.ok) throw new Error('Error fetching the data');
         return response.json();
      },
      staleTime: 5 * 60 * 1000,
   });
}
