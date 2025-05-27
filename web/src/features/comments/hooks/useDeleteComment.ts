import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../services/deleteComment';

export const useDeleteComment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
   });
};
