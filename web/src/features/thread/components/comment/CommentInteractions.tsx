import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropup } from "react-icons/io";
import { AiOutlineDislike } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { ReplyForm } from "../reply/ReplyForm";
import { ReplyList } from "../reply/ReplyList";
import { useGetReplies } from "../../hooks/useGetReplies";

export function CommentInteractions({ commentId }: { commentId: string }) {
  const [isReplyFieldOpen, setIsReplyFieldOpen] = useState(false);
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);

  const { data: replies = [] } = useGetReplies(commentId);
  const hasReplies = replies.length > 0;

  const toggleReplyField = () => setIsReplyFieldOpen((prev) => !prev);
  const toggleReplyList = () => setIsReplyListOpen((prev) => !prev);

  return (
    <>
      <div className="flex items-center gap-5">
        <AiOutlineLike />
        <AiOutlineDislike />
        <Button
          onClick={toggleReplyField}
          variant="ghost"
          type="button"
          className="text-sm"
        >
          reply
        </Button>
      </div>
      {isReplyFieldOpen && (
        <ReplyForm
          commentId={commentId}
          setIsReplyFieldOpen={setIsReplyFieldOpen}
        />
      )}
      {/* List of comments */}
      {hasReplies && (
        <Button onClick={toggleReplyList} type="button" variant="secondary">
          {isReplyListOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          {replies.length} replies
        </Button>
      )}
      {isReplyListOpen && <ReplyList commentId={commentId} />}
    </>
  );
}
