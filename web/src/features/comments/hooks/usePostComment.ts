import { postComment } from '../services/postComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Options = {
   onSuccessCallback?: () => void;
};

export const usePostComment = ({ onSuccessCallback }: Options = {}) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: postComment,
      onSuccess: () => {
          onSuccessCallback?.();
          queryClient.invalidateQueries({queryKey: ['comments']})
      },
      onError: (error) => {
         console.error('Failed to post comment:', error);
      },
   });
};
