import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/utils/getImageUrl';
import { CommentSection } from '@/features/thread';
import { UserContext } from '@/context/UserContext';
import { getFirstLetter } from '@/utils/getFirstLetter';
import { CustomToast, Note } from '@/components/shared';
import { ActionsButton, useViewSinglePost } from '@/features/posts';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import SinglePostSkeleton from '@/components/skeletons/SinglePostSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function View() {
   const { id: postId } = useParams();
   const { user, token } = useContext(UserContext);

   const { data, isLoading, error } = useViewSinglePost(postId!);

   return (
      <div className="mx-auto w-full max-w-5xl p-5 pt-5">
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
                     />
                  </div>

                  {/* Post Category and Title */}
                  <div className="space-y-2">
                     <Badge>{capitalizeFirstLetter(data.post.category)}</Badge>
                     <div className="flex justify-between gap-3">
                        <p className="text-2xl font-semibold">{data.post.title}</p>
                        {user && user.id === data.user.id && (
                           <ActionsButton id={postId} token={token} />
                        )}
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
                  <p className="text-justify whitespace-pre-line">{data.post.body}</p>
               </div>

               {/* Comment Section */}
               {user ? (
                  <div className="mt-10">
                     <CommentSection />
                  </div>
               ) : (
                  <div className="my-10">
                     <Note message="Create an account or log in to leave a comment." type="info" />
                  </div>
               )}
            </>
         )}
      </div>
   );
}
