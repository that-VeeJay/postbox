import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function CommentSection() {
  return (
    <div className="space-y-10">
      <CommentForm />
      <CommentList />
    </div>
  );
}
