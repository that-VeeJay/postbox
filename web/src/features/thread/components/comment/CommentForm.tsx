import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/icons/Spinner";

import { getImageUrl, getFirstLetter } from "@/utils";

import { usePostComment } from "../../hooks/usePostComment";

export function CommentForm() {
  const { user, token } = useContext(UserContext);
  const { id: postId } = useParams();
  const [comment, setComment] = useState("");

  // custom mutation hook
  const { mutate, isPending } = usePostComment();

  if (!user || !postId || !token) return null;

  // handler functions
  const handleClearInput = () => setComment("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        token: token,
        body: comment,
        postId: postId,
        userId: user.id,
        parentId: null,
      },
      {
        onSuccess: () => setComment(""),
      },
    );
  };

  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src={getImageUrl(user.profile_picture)} />
        <AvatarFallback>{getFirstLetter(user.name)}</AvatarFallback>
      </Avatar>
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <Input
          type="text"
          value={comment}
          onChange={handleInputChange}
          aria-label="Write a comment"
          placeholder="Write a comment..."
        />
        <div className="flex justify-end gap-3">
          <Button
            onClick={handleClearInput}
            type="button"
            variant="secondary"
            aria-label="Clear comment input"
          >
            clear
          </Button>
          <Button
            type="submit"
            aria-label="Submit comment"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Posting...
              </div>
            ) : (
              "Comment"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
