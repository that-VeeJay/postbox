type PropsType = {
   postId: string;
   body: string;
   userId: string;
   parentId: string | null;
   token: string;
};

export const postComment = async ({ postId, body, userId, parentId, token }: PropsType) => {
   const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
         body: body,
         post_id: postId,
         user_id: userId,
         parent_id: parentId,
      }),
   });
   if (!response.ok) throw new Error('Failed to post comment');
   return response.json();
};
