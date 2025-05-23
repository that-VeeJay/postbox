export const checkRepliesExist = async (commentId: string) => {
  const response = await fetch(`/api/posts/comments/${commentId}/has-replies`);
  if (!response.ok) throw new Error("Failed to post comment");
  return response.json();
};
