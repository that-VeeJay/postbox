import { Link } from 'react-router-dom';

import { User, LogOut } from 'lucide-react';

import { getImageUrl } from '@/utils/getImageUrl';
import { getFirstLetter } from '@/utils/getFirstLetter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { useLogout } from '../hooks/useLogout';

export function ProfileDropdown() {
   const { user } = useContext(UserContext);

   const { mutate } = useLogout();

   const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate();
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Avatar>
               <AvatarImage src={getImageUrl(user?.profile_picture)} className="object-cover" />
               <AvatarFallback>{getFirstLetter(user?.name)}</AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem asChild>
               <Link to="/profile" className="flex gap-2">
                  <User /> Profile
               </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <LogOut />
               <form onSubmit={handleLogout}>
                  <button>Logout</button>
               </form>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
