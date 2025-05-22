import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Compose() {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full space-y-3">
        <Input />
        <div className="flex items-center justify-end gap-3">
          <p className="text-sm">cancel</p>
          <Button>Comment</Button>
        </div>
      </div>
    </div>
  );
}
