import { Badge } from "@/components/ui/badge";
import type { PostsType } from "@/pages/Home/Index";
import { formatDate } from "@/utils/formatDate";
import { truncateText } from "@/utils/truncateText";
import { UpperRightArrow } from "@/components/icons/UpperRightArrow";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/getImageUrl";
import { Link } from "react-router-dom";
import { getFirstLetter } from "@/utils/getFirstLetter";

export default function CardOne({ post }: { post: PostsType }) {
  return (
    <div className="space-y-3">
      <Link to={`/posts/${post.id}`}>
        <img
          src={getImageUrl(post.image)}
          alt={post.title}
          draggable="false"
          className="aspect-[16/7] object-cover"
        />
      </Link>
      <div className="space-y-3 p-3">
        <Badge>{capitalizeFirstLetter(post.category)}</Badge>

        <Link
          to={`/posts/${post.id}`}
          className="flex items-start justify-between gap-2"
        >
          <h2 className="line-clamp-2 h-[3.8rem] flex-1 text-lg font-semibold break-words transition duration-200 hover:text-neutral-600 dark:hover:text-neutral-300">
            {post.title}
          </h2>

          <div className="flex flex-shrink-0 items-center pl-2">
            <UpperRightArrow size={20} />
          </div>
        </Link>

        <p className="line-clamp-2 h-[2.5rem] text-sm">{post.body}</p>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Avatar>
              {/* <AvatarImage src={profile1} /> */}
              <AvatarImage src={getImageUrl(post.user.profile_picture)} />
              <AvatarFallback>{getFirstLetter(post.user.name)}</AvatarFallback>
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
