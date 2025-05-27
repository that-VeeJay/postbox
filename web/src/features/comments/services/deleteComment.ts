type PropsType = {
   commentId: string;
   token: string | null;
};

export const deleteComment = async ({ commentId, token }: PropsType) => {
   const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (!response.ok) throw new Error('Failed to delete comment');
   return response.json();
};
