import { Badge } from "@/components/ui/badge";
import type { PostsType } from "@/pages/Home";
import { formatDate } from "@/helpers/formatDate";
import { truncateText } from "@/helpers/truncateText";
import { UpperRightArrow } from "@/components/icons/UpperRightArrow";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profile1 from "../../../assets/posts/profile1.jpg";
import { getImageUrl } from "@/helpers/getImageUrl";

export default function CardOne({ post }: { post: PostsType }) {
  return (
    <div className="space-y-3">
      <img
        src={getImageUrl(post.image)}
        alt={post.title}
        className="aspect-[16/7] object-cover"
      />
      <div className="space-y-3 p-3">
        <Badge>{capitalizeFirstLetter(post.category)}</Badge>
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-2 h-[3.8rem] flex-1 text-lg font-semibold break-words">
            {post.title}
          </h2>
          <div className="flex flex-shrink-0 items-center pl-2">
            <UpperRightArrow size={20} />
          </div>
        </div>
        <p className="line-clamp-2 h-[2.5rem] text-sm">{post.body}</p>
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
