import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ActionsButtonPropsType } from '../types';

export function useDeletePost() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: async ({ slug, token }: ActionsButtonPropsType) => {
         const response = await fetch(`/api/posts/${slug}`, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.json();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] });
         navigate('/', {
            state: {
               delete_success: 'Your post have been deleted. 👉🏻🗑️',
            },
         });
      },
   });
   return {
      deletePost: mutation.mutate,
   };
}
