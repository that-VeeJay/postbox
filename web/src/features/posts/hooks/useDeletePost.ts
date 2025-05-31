import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../services/deletePost';

export function useDeletePost() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['recent_posts'] });
         queryClient.invalidateQueries({ queryKey: ['posts'] });
         navigate('/', {
            state: {
               delete_success: 'Your post have been deleted. 👉🏻🗑️',
            },
         });
      },
   });
}
