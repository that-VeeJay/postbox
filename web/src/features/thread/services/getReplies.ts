export const getReplies = async (commentId: string) => {
  const response = await fetch(`/api/posts/replies/${commentId}`);
  if (!response.ok) throw new Error("Failed to post comment");
  return response.json();
};
