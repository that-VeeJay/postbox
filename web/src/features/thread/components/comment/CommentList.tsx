import { CommentItem } from "./CommentItem";
import { useGetComments } from "../../hooks/useGetComments";
import { useParams } from "react-router-dom";

export function CommentList() {
  const { id: postId } = useParams();
  const { data: comments, isLoading } = useGetComments(postId!);

  if (isLoading) return <p>Loading comments...</p>;
  if (!comments || comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="space-y-6">
      {comments.map((comment: any) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
