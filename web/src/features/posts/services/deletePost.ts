import type { ActionsButtonPropsType } from '../types';

export const deletePost = async ({ slug, token }: ActionsButtonPropsType) => {
   const response = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return response.json();
};
