import { getFirstLetter, getImageUrl, timeAgo } from '@/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { CommentItemProps } from '../../types';
import { CommentInteractions } from './CommentInteractions';
import { CommentActions } from './CommentActions';
import { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateComment } from '../../hooks/useUpdateComment';

export function CommentItem({ comment }: CommentItemProps) {
   const { user, token } = useContext(UserContext);
   const authorizedUser = user.id === comment.user.id;

   const [isEditing, setIsEditing] = useState(false);
   const [editedComment, setEditedComment] = useState(comment.body);

   const { mutate } = useUpdateComment();

   const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedComment(comment.body);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedComment(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(
         {
            updatedComment: editedComment,
            commentId: comment.id,
            token: token!,
         },
         {
            onSuccess: () => {
               setIsEditing(false);
            },
         }
      );
   };

   return (
      <div className="flex gap-3">
         <Avatar>
            <AvatarImage src={getImageUrl(comment.user.profile_picture)} />
            <AvatarFallback>{getFirstLetter(comment.user.name)}</AvatarFallback>
         </Avatar>
         <div className="w-full space-y-1">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                     @{comment.user.username}
                  </p>
                  <small className="text-xs text-neutral-600 dark:text-neutral-400">
                     {timeAgo(comment.created_at)}
                  </small>
                  <small className="text-xs text-neutral-600 dark:text-neutral-400">
                     {comment.is_edited && '(edited)'}
                  </small>
               </div>
               {authorizedUser && (
                  <CommentActions commentId={comment.id} setIsEditing={setIsEditing} />
               )}
            </div>
            {isEditing ? (
               <form onSubmit={handleSubmit} className="space-y-2">
                  <Input value={editedComment} onChange={handleInputChange} />
                  <div className="flex justify-end">
                     <Button type="button" onClick={handleCancelEdit} variant="ghost">
                        cancel
                     </Button>
                     <Button type="submit">Save</Button>
                  </div>
               </form>
            ) : (
               <p>{comment.body}</p>
            )}
            {/* Interactions */}
            <div className="space-y-3">
               <CommentInteractions commentId={comment.id} />
            </div>
         </div>
      </div>
   );
}
