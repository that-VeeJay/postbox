import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirstLetter, getImageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/icons/Spinner';
import { UserContext } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePostReply } from '../../hooks/usePostReply';

type PropsTYpe = {
   commentId: string;
   setIsReplyFieldOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ReplyForm({ commentId, setIsReplyFieldOpen }: PropsTYpe) {
   const { user, token } = useContext(UserContext);
   const { id: postId } = useParams();
   const [reply, setReply] = useState('');

   const { mutate, isPending } = usePostReply({ setReply, setIsReplyFieldOpen });

   const handleCloseForm = () => {
      setIsReplyFieldOpen((prev) => !prev);
      setReply('');
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setReply(e.target.value);
   };

   const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({
         token: token!,
         body: reply,
         postId: postId!,
         userId: user.id,
         parentId: commentId,
      });
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-3">
         <div className="flex items-center gap-3">
            <Avatar>
               <AvatarImage src={getImageUrl(user.profile_picture)} />
               <AvatarFallback>{getFirstLetter(user.name)}</AvatarFallback>
            </Avatar>
            <Input
               type="text"
               value={reply}
               onChange={handleInputChange}
               aria-label="Write a reply"
               placeholder="Write a reply..."
            />
         </div>
         <div className="flex justify-end gap-3">
            <Button
               type="button"
               onClick={handleCloseForm}
               variant="ghost"
               aria-label="Clear reply input"
            >
               close
            </Button>
            <Button type="submit" disabled={isPending} aria-label="Submit reply">
               {isPending ? (
                  <div className="flex items-center gap-2">
                     <Spinner />
                     Please wait...
                  </div>
               ) : (
                  'Comment'
               )}
            </Button>
         </div>
      </form>
   );
}
