import { Badge } from "@/components/ui/badge";
import type { PostsType } from "@/pages/Home";
import { formatDate } from "@/helpers/formatDate";
import { truncateText } from "@/helpers/truncateText";
import { UpperRightArrow } from "@/components/icons/UpperRightArrow";
import { capitalizeFirstLetter } from "@/helpers/CapitalizeFirstLetter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profile1 from "../../../assets/posts/profile1.jpg";

export default function CardOne({ post }: { post: PostsType }) {
  console.log(post);
  return (
    <div className="space-y-3">
      <img
        src={post.image}
        alt={post.title}
        className="aspect-[16/7] object-cover"
      />
      <div className="space-y-3 p-3">
        <Badge>{capitalizeFirstLetter(post.category)}</Badge>
        <div className="flex justify-between">
          <h2 className="h-[3.8rem] text-lg font-semibold">{post.title}</h2>
          <UpperRightArrow size={20} />
        </div>
        <p className="line-clamp-2 text-sm">{post.body}</p>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile1} />
              <AvatarFallback>{post.user.name}</AvatarFallback>
            </Avatar>
            <span className="line-clamp-1">
              {truncateText(post.user.name, 20)}
            </span>
          </div>
          <span className="text-sm">{formatDate(post.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
