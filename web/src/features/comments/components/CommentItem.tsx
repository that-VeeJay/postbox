import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

import { timeAgo, getImageUrl, getFirstLetter } from "@/utils";

import ReplyField from "./ReplyField";

import type { CommentType } from "../types";

type PropsType = {
  comment: CommentType;
  replyingToId: number | null;
  setReplyingToId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function CommentItem({
  comment,
  replyingToId,
  setReplyingToId,
}: PropsType) {
  const isReplying = replyingToId === comment.id;

  const handleReplyClick = () => {
    setReplyingToId(isReplying ? null : comment.id);
  };

  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={getImageUrl(comment.user.profile_picture)}
          alt={`S${comment.user.name}]'s profile picture. `}
        />
        <AvatarFallback>{getFirstLetter(comment.user.name)}</AvatarFallback>
      </Avatar>
      <div className="w-full space-y-1">
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            @{comment.user.username}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {timeAgo(comment.created_at)}
          </p>
        </div>
        <p>{comment.body}</p>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <AiOutlineLike size={20} />
            <small>20</small>
          </div>
          <AiOutlineDislike size={20} />
          <Button
            onClick={handleReplyClick}
            variant="ghost"
            className="text-sm"
          >
            reply
          </Button>
        </div>
        {isReplying && <ReplyField setReplyingToId={setReplyingToId} />}
      </div>
    </div>
  );
}
