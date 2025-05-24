import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../services/deleteComment';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteComment = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['comments'] });
         toast.success('Your comment was deleted 🗑️');
      },
   });
};
