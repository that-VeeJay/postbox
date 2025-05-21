import { useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDeletePost } from "../hooks/useDeletePost";
import type { ActionsButtonPropsType } from "../types";

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
          <FaEdit />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>
          <MdEdit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <div className="flex items-center gap-2">
            <MdDelete color="red" />
            <p className="text-red-500">Delete</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
