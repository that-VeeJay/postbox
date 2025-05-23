import { useMutation } from "@tanstack/react-query";
import { postComment } from "../services/postComment";

export const usePostComment = () => {
  return useMutation({
    mutationFn: postComment,
  });
};
