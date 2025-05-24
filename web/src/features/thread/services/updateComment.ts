type PropsType = {
   updatedComment: string;
   commentId: string;
   token: string;
};

export const updateComment = async ({ updatedComment, commentId, token }: PropsType) => {
   const response = await fetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: updatedComment }),
   });
   if (!response.ok) throw new Error('Failed to update comment');
   return response.json();
};
