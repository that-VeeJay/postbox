import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../services/updateComment';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateComment = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateComment,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
   });
};
