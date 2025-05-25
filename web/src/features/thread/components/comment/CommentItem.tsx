import { getFirstLetter, getImageUrl, timeAgo } from '@/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { CommentItemProps } from '../../types';
import { CommentInteractions } from './CommentInteractions';
import { CommentActions } from './CommentActions';
import { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { CommentEditForm } from './CommentEditForm';

export function CommentItem({ comment }: CommentItemProps) {
   const { user, token } = useContext(UserContext);
   const authorizedUser = user.id === comment.user.id;

   const [isEditing, setIsEditing] = useState(false);

   return (
      <article className="flex gap-3" aria-label={`Comment by ${comment.user.name}`}>
         <Avatar>
            <AvatarImage
               src={getImageUrl(comment.user.profile_picture)}
               alt={`${comment.user.name}'s profile picture`}
            />
            <AvatarFallback>{getFirstLetter(comment.user.name)}</AvatarFallback>
         </Avatar>
         <div className="w-full space-y-1">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                     @{comment.user.username}
                  </p>
                  <time
                     dateTime={comment.created_at}
                     className="text-xs text-neutral-600 dark:text-neutral-400"
                  >
                     {timeAgo(comment.created_at)}
                  </time>
                  {comment.is_edited && (
                     <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        (edited)
                     </span>
                  )}
               </div>
               {authorizedUser && (
                  <CommentActions commentId={comment.id} setIsEditing={setIsEditing} />
               )}
            </div>
            {isEditing ? (
               <CommentEditForm setIsEditing={setIsEditing} comment={comment} token={token!} />
            ) : (
               <p>{comment.body}</p>
            )}
            {/* Interactions */}
            <footer className="space-y-3">
               <CommentInteractions commentId={comment.id} />
            </footer>
         </div>
      </article>
   );
}
