import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

type PropsType = {
   commentId: string;
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CommentActions({ commentId, setIsEditing }: PropsType) {
   const { token } = useContext(UserContext);
   const { mutate } = useDeleteComment();

   const handleCommentEdit = () => {
      setIsEditing(true);
   };

   const handleCommentDelete = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (token) mutate({ commentId, token });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <BsThreeDotsVertical className="h-[20px] w-[20px]" />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCommentEdit}>
               <MdEdit />
               Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
               <MdDelete className="text-red-500" />
               <form onSubmit={handleCommentDelete}>
                  <button type="submit">Delete</button>
               </form>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
