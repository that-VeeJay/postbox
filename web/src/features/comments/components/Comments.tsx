import CommentItem from "./CommentItem";
import Compose from "./Compose";

import { useGetComments } from "../hooks/useGetComments";

import type { CommentType } from "../types";
import { useState } from "react";

export default function Comments({ id }: { id: string }) {
  const [replyingToId, setReplyingToId] = useState<number | null>(null);

  const { data: comments, isLoading } = useGetComments(id);

  return (
    <>
      <div className="space-y-5">
        <div className="text-xl font-semibold">{comments?.length} Comments</div>
        {/* Compose comment */}
        <Compose />
      </div>
      {/* List of comments */}
      {isLoading ? (
        <div className="text-lg font-semibold">Loading comments...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {comments?.map((comment: CommentType) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
            />
          ))}
        </div>
      )}
    </>
  );
}
