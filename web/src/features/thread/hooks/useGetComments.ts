import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/getComments";

export const useGetComments = (postId: string) => {
  return useQuery({
     queryKey: ["comments", postId],
     queryFn: () => getComments(postId),
     enabled: !!postId,
     staleTime: 60 * 1000,
  });
};
