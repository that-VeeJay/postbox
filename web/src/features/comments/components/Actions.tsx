import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

type PropsType = {
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Actions({ setIsEditing }: PropsType) {
   const handleEditClick = () => setIsEditing(true);

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
            <DropdownMenuItem>
               <MdDelete className="text-red-500" />
               <p className="text-red-500">Delete</p>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
