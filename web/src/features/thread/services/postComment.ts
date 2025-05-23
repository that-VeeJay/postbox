type PropsType = {
  token: string;
  body: string;
  postId: string;
  userId: string;
  parentId?: number | null;
};

export const postComment = async ({
  token,
  body,
  postId,
  userId,
  parentId,
}: PropsType) => {
  const response = await fetch("/api/posts/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      body,
      post_id: postId,
      user_id: userId,
      parent_id: parentId,
    }),
  });
  if (!response.ok) throw new Error("Failed to post comment");
  return response.json();
};
