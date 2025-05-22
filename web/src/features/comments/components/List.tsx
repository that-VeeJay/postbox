import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

export default function List() {
  const [replyFieldOpen, setReplyFieldOpen] = useState(false);

  const handleReplyClick = () => {
    setReplyFieldOpen((prev) => !prev);
  };

  const handleReplyClose = () => {
    setReplyFieldOpen(false);
  };

  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-3">
          <p className="text-sm">@username</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            10 minutes ago
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          dignissimos? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit omnis pariatur autem quibusdam eos inventore voluptate,
          molestiae sequi itaque repellendus.
        </p>
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
        {replyFieldOpen && (
          <div className="mt-5 flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-3">
              <Input />
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={handleReplyClose}
                  className="text-sm"
                >
                  cancel
                </Button>
                <Button variant="secondary">Comment</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
