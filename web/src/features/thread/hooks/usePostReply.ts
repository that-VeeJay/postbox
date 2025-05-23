import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReply } from "../services/postReply";

export const usePostReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies"] });
    },
  });
};
