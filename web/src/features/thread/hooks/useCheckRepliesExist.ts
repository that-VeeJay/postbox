import { useQuery } from "@tanstack/react-query";
import { checkRepliesExist } from "../services/checkRepliesExist";

export const useCheckRepliesExist = (commentId: string) => {
  return useQuery({
    queryKey: ["reply_exist", commentId],
    queryFn: () => checkRepliesExist(commentId),
    enabled: !!commentId,
  });
};
