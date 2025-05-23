import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../services/getReplies";

export const useGetReplies = (commentId: string) => {
  return useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getReplies(commentId),
    enabled: !!commentId,
  });
};
