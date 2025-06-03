import { Heart } from 'lucide-react';
import { useState } from 'react';

type LikeButtonPropsType = {
   postId: string;
   token: string;
   likesCount: number;
   likedByUser: boolean;
};

export function LikeButton({ postId, token, likesCount, likedByUser }: LikeButtonPropsType) {
   const [liked, setLiked] = useState(likedByUser);
   const [count, setCount] = useState(likesCount);

   const handleLike = async () => {
      await fetch(`/api/posts/${postId}/like`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      setCount((prev) => prev + 1);
      setLiked(true);
   };

   const handleDislike = async () => {
      await fetch(`/api/posts/${postId}/unlike`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      setCount((prev) => prev - 1);
      setLiked(false);
   };

   return (
      <div className="flex gap-2">
         {liked ? (
            <button type="button" onClick={handleDislike}>
               <Heart color="red" fill="red" />
            </button>
         ) : (
            <button type="button" onClick={handleLike}>
               <Heart />
            </button>
         )}
         {count}
      </div>
   );
}
