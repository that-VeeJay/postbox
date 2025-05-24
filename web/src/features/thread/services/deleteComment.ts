export const deleteComment = async ({ commentId, token }: { commentId: string; token: string }) => {
   const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (!response.ok) throw new Error('Failed to delete comment');
   return response.json();
};
