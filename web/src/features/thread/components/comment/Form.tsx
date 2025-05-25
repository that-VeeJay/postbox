import { UserContext } from '@/context/UserContext';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/icons/Spinner';
import { Textarea } from '@/components/ui/textarea';

import { getImageUrl, getFirstLetter } from '@/utils';

import { usePostComment } from '../../hooks/usePostComment';

export function Form() {
   const { user, token } = useContext(UserContext);
   const { id: postId } = useParams();
   const [comment, setComment] = useState('');

   // custom mutation hook
   const { mutate, isPending } = usePostComment({ setComment });

   if (!user || !postId || !token) return null;

   // handler functions
   const handleClearInput = () => setComment('');

   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({
         token: token,
         body: comment,
         postId: postId,
         userId: user.id,
         parentId: null,
      });
   };

   return (
      <div className="flex gap-3">
         <Avatar>
            <AvatarImage
               src={getImageUrl(user.profile_picture)}
               alt={`${user.name}'s profile picture`}
            />
            <AvatarFallback>{getFirstLetter(user.name)}</AvatarFallback>
         </Avatar>
         <form onSubmit={handleSubmit} className="w-full space-y-3">
            <Textarea
               name="comment"
               value={comment}
               onChange={handleInputChange}
               aria-label="Write a comment"
               placeholder="Write a comment..."
               className="resize-none"
            />
            <div className="flex justify-end gap-3">
               <Button
                  onClick={handleClearInput}
                  type="button"
                  variant="ghost"
                  aria-label="Clear comment input"
               >
                  clear
               </Button>
               <Button
                  type="submit"
                  aria-label="Submit comment"
                  aria-disabled={isPending || !comment}
                  disabled={isPending || !comment}
               >
                  {isPending ? (
                     <div className="flex items-center gap-2" aria-live="polite" role="status">
                        <Spinner />
                        Posting...
                     </div>
                  ) : (
                     'Comment'
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
}
