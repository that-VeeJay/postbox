export const getComments = async (postId: string) => {
   const response = await fetch(`/api/comments/${postId}`);
   if (!response.ok) throw new Error('Failed to post comment');
   return response.json();
};
