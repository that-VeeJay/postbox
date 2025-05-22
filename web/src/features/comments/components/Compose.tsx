import { useContext, useState } from "react";

import { useParams } from "react-router-dom";

import Spinner from "@/components/icons/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getImageUrl } from "@/utils/getImageUrl";
import { getFirstLetter } from "@/utils/getFirstLetter";

import { useMutation } from "@tanstack/react-query";
import { UserContext } from "@/context/UserContext";

export default function Compose() {
  const { user, token } = useContext(UserContext);
  const { id } = useParams();

  const [comment, setComment] = useState({ body: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: comment.body,
          post_id: id,
          user_id: user.id,
          parent_id: null,
        }),
      });
      const data = await response.json();
      console.log(data);
    },
    onSuccess: () => {
      setComment({ body: "" });
    },
  });

  const cancelComment = () => {
    setComment({ body: "" });
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={getImageUrl(user.profile_picture)}
          alt="profile picture"
        />
        <AvatarFallback>{getFirstLetter(user.name)}</AvatarFallback>
      </Avatar>
      <form onSubmit={handleCommentSubmit} className="w-full space-y-3">
        <Input
          value={comment.body}
          onChange={(e) => setComment({ body: e.target.value })}
        />
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={cancelComment}
            type="button"
            variant="ghost"
            className="text-sm"
          >
            cancel
          </Button>
          <Button type="submit" disabled={isPending || comment.body.length < 1}>
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
