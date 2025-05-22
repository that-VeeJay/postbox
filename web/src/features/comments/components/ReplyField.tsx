import { useContext } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";

import { getImageUrl, getFirstLetter } from "@/utils";

type PropsType = {
  setReplyingToId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function ReplyField({ setReplyingToId }: PropsType) {
  const { user } = useContext(UserContext);

  return (
    <div className="mt-5 flex w-full gap-3">
      <Avatar>
        <AvatarImage
          src={getImageUrl(user.profile_picture)}
          alt={`${user.name}'s profile picture`}
        />
        <AvatarFallback>{getFirstLetter(user.name)}</AvatarFallback>
      </Avatar>
      <div className="w-full space-y-3">
        <Input />
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => setReplyingToId(null)}
            className="text-sm"
          >
            cancel
          </Button>
          <Button variant="secondary">Comment</Button>
        </div>
      </div>
    </div>
  );
}
