import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../services/postComment";

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", "replies"] });
    },
  });
};
