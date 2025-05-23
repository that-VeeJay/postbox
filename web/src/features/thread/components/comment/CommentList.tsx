import { CommentItem } from "./CommentItem";
import { useGetComments } from "../../hooks/useGetComments";
import { useParams } from "react-router-dom";
import { CommentLoadSkeleton } from "@/components/skeletons/CommentLoadSkeleton";

export function CommentList() {
  const { id: postId } = useParams();
  const { data: comments, isLoading } = useGetComments(postId!);

  if (isLoading) return <CommentLoadSkeleton />;
  if (!comments || comments.length === 0)
    return (
      <p className="mt-10 text-center text-xl font-semibold">
        This place is empty... for now. Drop a comment!
      </p>
    );

  return (
    <div className="space-y-6">
      {comments.map((comment: any) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
