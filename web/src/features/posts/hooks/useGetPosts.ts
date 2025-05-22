import { useQuery } from "@tanstack/react-query";

export function useGetPosts() {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Error fetching the data");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
