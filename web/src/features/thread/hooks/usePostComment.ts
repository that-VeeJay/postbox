import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../services/postComment';

export const usePostComment = ({
   setComment,
}: {
   setComment: React.Dispatch<React.SetStateAction<string>>;
}) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: postComment,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['comments'] });
         queryClient.invalidateQueries({ queryKey: ['replies'] });
         setComment('');
      },
   });
};
