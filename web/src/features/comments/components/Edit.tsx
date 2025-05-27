import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateComment } from '../hooks/useUpdateComment';
import Spinner from '@/components/icons/Spinner';

type PropsType = {
   commentBody: string;
   commentId: string;
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Edit({ commentBody, setIsEditing, commentId }: PropsType) {
   const [input, setInput] = useState(commentBody);

   const { mutate, isPending } = useUpdateComment({
      onSuccessCallback: () => {
         setInput('');
         setIsEditing(false);
      },
   });

   const handleCancel = () => {
      setInput('');
      setIsEditing(false);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setInput(e.target.value);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({ input, commentId });
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-3">
         <Textarea value={input} onChange={handleInputChange} className="resize-none" />
         <div className="flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={handleCancel}>
               cancel
            </Button>
            <Button type="submit" disabled={isPending || !input}>
               {isPending ? (
                  <div className="flex items-center gap-1">
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
