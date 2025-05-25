import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUpdateComment } from '../../hooks/useUpdateComment';
import type { CommentItemProps } from '../../types';

type PropsType = {
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
   comment: CommentItemProps['comment'];
   token: string;
};

export function CommentEditForm({ setIsEditing, comment, token }: PropsType) {
   const [editedComment, setEditedComment] = useState(comment.body);

   const { mutate } = useUpdateComment({ setIsEditing });

   // Handler functions
   const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedComment(comment.body);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedComment(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({
         updatedComment: editedComment,
         commentId: comment.id,
         token: token!,
      });
   };
   return (
      <form onSubmit={handleSubmit} className="space-y-2">
         <Textarea
            value={editedComment}
            onChange={handleInputChange}
            aria-label="Edit comment"
            className="resize-none"
         />
         <div className="flex justify-end">
            <Button type="button" onClick={handleCancelEdit} variant="ghost">
               cancel
            </Button>
            <Button type="submit">Save</Button>
         </div>
      </form>
   );
}
