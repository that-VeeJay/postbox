import { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';

export function Interactions() {
   const [liked, setLiked] = useState(false);
   const [disliked, setDisliked] = useState(false);
   const [likeCount, setLikeCount] = useState(0);

   const handleLike = () => {
      if (liked) {
         setLikeCount((prev) => prev - 1);
      } else {
         setLikeCount((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
   };

   const handleDislike = () => {
      setDisliked((prev) => !prev);
   };

   return (
      <div>
         <div className="flex items-center gap-5">
            <button type="button" onClick={handleLike} className="flex items-center gap-1">
               {liked ? (
                  <AiFillLike className="h-[20px] w-[20px]" />
               ) : (
                  <AiOutlineLike className="h-[20px] w-[20px]" />
               )}
               <span className="text-sm">{likeCount}</span>
            </button>
            <button type="button" onClick={handleDislike}>
               {disliked ? (
                  <AiFillDislike className="h-[20px] w-[20px]" />
               ) : (
                  <AiOutlineDislike className="h-[20px] w-[20px]" />
               )}
            </button>
         </div>
      </div>
   );
}
