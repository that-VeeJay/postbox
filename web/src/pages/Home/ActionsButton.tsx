import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function ActionsButton() {
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
        <DropdownMenuItem>
          <MdEdit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <MdDelete />
            <p className="text-red-500">Delete</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
