import { useNavigate } from 'react-router-dom';
import { SquarePen, Pen, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeletePost } from '../hooks/useDeletePost';
import type { ActionsButtonPropsType } from '../types';

export default function ActionsButton({ id, token }: ActionsButtonPropsType) {
   const navigate = useNavigate();

   const { deletePost } = useDeletePost();

   const handleDelete = () => {
      if (!id || !token) return;
      deletePost({ id, token });
   };

   const handleEdit = () => {
      navigate(`/posts/${id}/edit`);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline">
               <SquarePen />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
               <Pen />
               Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
               <div className="flex items-center gap-2">
                  <Trash color="red" />
                  <p className="text-red-500">Delete</p>
               </div>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
