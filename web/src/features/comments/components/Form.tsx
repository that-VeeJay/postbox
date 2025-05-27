import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/icons/Spinner';
import { CustomAvatar } from '@/components/shared';
import { Textarea } from '@/components/ui/textarea';
import { UserContext } from '@/context/UserContext';
import { usePostComment } from '../hooks/usePostComment';

export default function Form({ postId }: { postId: string }) {
   const { user, token } = useContext(UserContext);
   const [input, setInput] = useState('');

   const { mutate, isPending } = usePostComment({ onSuccessCallback: () => setInput('') });

   // handler functions
   const handleInputClear = () => setInput('');
   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setInput(e.target.value);
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({
         postId: postId!,
         body: input,
         userId: user.id,
         parentId: null,
         token: token!,
      });
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-3">
         <div className="flex gap-3">
            <CustomAvatar image={user?.profile_picture} alt={user?.name} fallback={user?.name} />
            <Textarea
               className="resize-none"
               placeholder="Add your comment..."
               aria-label="Add your comment"
               value={input}
               onChange={handleInputChange}
            />
         </div>
         <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={handleInputClear}>
               clear
            </Button>
            <Button type="submit" disabled={isPending || !input}>
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
