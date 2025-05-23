import { useGetReplies } from "../../hooks/useGetReplies";
import { ReplyItem } from "./ReplyItem";

type PropsType = {
  commentId: string;
};

export function ReplyList({ commentId }: PropsType) {
  const { data: replies = [] } = useGetReplies(commentId!);

  return (
    <div className="space-y-5">
      {replies.map((reply: any) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
