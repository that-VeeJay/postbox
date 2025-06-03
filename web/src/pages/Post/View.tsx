import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/utils/getImageUrl';
import { CustomToast } from '@/components/shared';
import { UserContext } from '@/context/UserContext';
import { getFirstLetter } from '@/utils/getFirstLetter';
import { ActionsButton, useViewSinglePost, LikeButton } from '@/features/posts';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import SinglePostSkeleton from '@/components/skeletons/SinglePostSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bookmark } from 'lucide-react';

export default function View() {
   const { slug } = useParams();
   const { user, token } = useContext(UserContext);

   const { data, isLoading, error } = useViewSinglePost(slug!);

   return (
      <div className="mx-auto w-full max-w-5xl">
         {isLoading ? (
            <SinglePostSkeleton />
         ) : error ? (
            <CustomToast
               message="Could not load content at this time. Please try again later."
               type="error"
               className="mt-5 text-center"
            />
         ) : (
            <>
               <div className="space-y-5">
                  {/* Post Image */}
                  <div className="aspect-[16/9] overflow-hidden">
                     <img
                        src={getImageUrl(data.post.image)}
                        alt="Cover Image"
                        className="h-full w-full object-cover"
                        width="1600"
                        height="900"
                        loading="lazy"
                     />
                  </div>

                  <div className="space-y-5 px-6">
                     {/* Post Category and Title */}
                     <div className="space-y-2">
                        <Badge>{capitalizeFirstLetter(data.post.category)}</Badge>
                        <div className="flex justify-between gap-3">
                           <p className="text-2xl font-semibold">{data.post.title}</p>
                           <div className="flex items-center gap-5">
                              <LikeButton
                                 postId={data.post.id}
                                 token={token!}
                                 likesCount={data.post.likes_count}
                                 likedByUser={data.liked_by_current_user}

                              />
                              <Bookmark />
                              {user && user.id === data.user.id && (
                                 <ActionsButton slug={slug!} token={token} />
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Author Info */}
                     <div className="flex items-center gap-3">
                        <Avatar>
                           <AvatarImage
                              src={getImageUrl(data.user.profile_picture)}
                              className="object-cover"
                           />
                           <AvatarFallback>{getFirstLetter(data.user.name)}</AvatarFallback>
                        </Avatar>
                        <p>{data.user.name}</p>
                     </div>

                     {/* Post Body */}
                     <div
                        className="prose max-w-none text-justify"
                        dangerouslySetInnerHTML={{ __html: data.post.body }}
                     />
                  </div>
               </div>

               {/* Comment Section */}
            </>
         )}
      </div>
   );
}
