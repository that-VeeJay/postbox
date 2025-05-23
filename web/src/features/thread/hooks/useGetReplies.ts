import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../services/getReplies";

export const useGetReplies = (commentId: string, isReplyListOpen?: boolean) => {
  return useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getReplies(commentId),
    enabled: !!commentId && isReplyListOpen,
    staleTime: 60 * 1000,
  });
};
