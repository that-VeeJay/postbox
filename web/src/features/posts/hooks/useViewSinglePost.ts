import { useQuery } from "@tanstack/react-query";

export function useViewSinglePost(id: string) {
  const query = useQuery({
    queryKey: ["single_post", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const response = await fetch(`/api/posts/${id}`);
      return response.json();
    },
    enabled: !!id,
    staleTime: 100000,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
