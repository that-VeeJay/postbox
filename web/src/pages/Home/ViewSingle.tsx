import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getImageUrl } from "@/utils/getImageUrl";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { getFirstLetter } from "@/utils/getFirstLetter";
import SingePostSkeleton from "@/components/skeletons/SinglePostSkeleton";

export default function ViewSingle() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["single_post", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      return response.json();
    },
    enabled: !!id,
    staleTime: 100000,
  });

  return (
    <div className="mx-auto w-full max-w-5xl p-5 pt-5">
      {isLoading ? (
        <SingePostSkeleton />
      ) : (
        <div className="space-y-5">
          <img
            src={getImageUrl(data?.post?.image)}
            alt=""
            className="aspect-[16/9] object-cover"
          />

          <div className="space-y-2">
            <Badge>{capitalizeFirstLetter(data?.post?.category)}</Badge>
            <div className="flex justify-between gap-3">
              <p className="text-2xl font-semibold">{data?.post?.title}</p>
              {user && user.id === data?.user.id && (
                <Button variant="outline">Actions</Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={getImageUrl(data?.user?.profile_picture)} />
              <AvatarFallback>
                {getFirstLetter(data?.user?.name)}
              </AvatarFallback>
            </Avatar>
            <p>{data?.user?.name}</p>
          </div>

          <p className="text-justify whitespace-pre-line">{data?.post?.body}</p>
        </div>
      )}
    </div>
  );
}
