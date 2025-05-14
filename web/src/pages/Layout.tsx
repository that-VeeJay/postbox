import { Link, Outlet } from "react-router-dom";
import { ProfileIcon } from "@/components/icons/ProfileIcon";
import { LogOutIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import profile1 from "../assets/posts/profile1.jpg";

export default function Layout() {
  return (
    <>
      <header>
        <nav className="fixed top-0 left-0 z-50 w-full bg-white/50 p-5 backdrop-blur-xl dark:bg-neutral-950/50">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/">
              <h1 className="text-2xl font-semibold">POSTBOX</h1>
            </Link>
            <div className="hidden gap-8 font-medium md:flex">
              <Link to="">Home</Link>
              <Link to="">Followed</Link>
              <Link to="">People</Link>
              <Link to="">Saved</Link>
            </div>
            <div className="space-x-3">
              {/* <input
                type="search"
                className="bg-gray-100 rounded-xl p-1 dark:bg-zinc-900"
              /> */}
              <div className="flex gap-3">
                <Button>Create</Button>
                <ModeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={profile1} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <ProfileIcon /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOutIcon />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
