import { useQuery } from "@tanstack/react-query";

export function useGetComments(id: string | undefined) {
  const query = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}/comments`);
      return await response.json();
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
  };
}
