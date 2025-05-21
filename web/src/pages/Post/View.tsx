import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getImageUrl } from "@/utils/getImageUrl";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

import SingePostSkeleton from "@/components/skeletons/SinglePostSkeleton";
import CustomToast from "@/components/shared/CustomToast";

import ActionsButton from "../../features/posts/components/ActionsButton";

import { useViewSinglePost } from "@/features/posts/hooks/useViewSinglePost";

export default function View() {
  const { id } = useParams();
  const { user, token } = useContext(UserContext);

  const { data, isLoading, error } = useViewSinglePost(id!);

  return (
    <div className="mx-auto w-full max-w-5xl p-5 pt-5">
      {isLoading ? (
        <SingePostSkeleton />
      ) : error ? (
        <CustomToast
          message="Could not load content at this time. Please try again later."
          type="error"
          className="mt-5 text-center"
        />
      ) : (
        <div className="space-y-5">
          {/* Post Image */}
          <img
            src={getImageUrl(data.post.image)}
            alt=""
            className="aspect-[16/9] object-cover"
          />

          {/* Post Category and Title */}
          <div className="space-y-2">
            <Badge>{capitalizeFirstLetter(data.post.category)}</Badge>
            <div className="flex justify-between gap-3">
              <p className="text-2xl font-semibold">{data.post.title}</p>
              {user && user.id === data.user.id && (
                <ActionsButton id={id} token={token} />
              )}
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={getImageUrl(data.user.profile_picture)}
                className="object-"
              />
              <AvatarFallback>{getFirstLetter(data.user.name)}</AvatarFallback>
            </Avatar>
            <p>{data.user.name}</p>
          </div>

          {/* Post Body */}
          <p className="text-justify whitespace-pre-line">{data.post.body}</p>
        </div>
      )}
    </div>
  );
}
