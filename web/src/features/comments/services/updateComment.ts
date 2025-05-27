type PropsType = {
   input: string;
   commentId: string;
};

export const updateComment = async ({ input, commentId }: PropsType) => {
   const token = localStorage.getItem('token');

   const response = await fetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
         body: input,
      }),
   });
   if (!response.ok) throw new Error('Failed to post comment');
   return response.json();
};
