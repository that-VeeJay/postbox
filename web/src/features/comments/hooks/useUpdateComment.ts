import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../services/updateComment';

type Options = {
   onSuccessCallback?: () => void;
};

export const useUpdateComment = ({ onSuccessCallback }: Options = {}) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateComment,
      onSuccess: () => {
         onSuccessCallback?.();
         queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
   });
};
