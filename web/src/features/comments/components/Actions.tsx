import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { useDeleteComment } from '../hooks/useDeleteComment';

type PropsType = {
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
   commentId: string;
};

export function Actions({ setIsEditing, commentId }: PropsType) {
   const { token } = useContext(UserContext);
   const { mutate } = useDeleteComment();

   const handleEditClick = () => setIsEditing(true);

   const handleDeleteClick = () => {
      if (window.confirm('Are you sure you want to delete this comment?')) {
         mutate({ commentId, token });
      }
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <BsThreeDotsVertical />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEditClick}>
               <MdEdit />
               Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteClick}>
               <MdDelete className="text-red-500" />
               <p className="text-red-500">Delete</p>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
