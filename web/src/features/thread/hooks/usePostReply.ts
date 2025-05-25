import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReply } from '../services/postReply';

type PropsType = {
   setReply: React.Dispatch<React.SetStateAction<string>>;
   setIsReplyFieldOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePostReply = ({ setReply, setIsReplyFieldOpen }: PropsType) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: postReply,
      onSuccess: () => {
         setReply('');
         setIsReplyFieldOpen((prev) => !prev);
         queryClient.invalidateQueries({ queryKey: ['replies'] });
         queryClient.invalidateQueries({ queryKey: ['reply_exist'] });
      },
   });
};
