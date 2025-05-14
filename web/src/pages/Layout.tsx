import { Link, Outlet } from "react-router-dom";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import profile1 from "../assets/posts/profile1.jpg";

export default function Layout() {
  return (
    <>
      <header>
        <nav className=" p-5 bg-white/50 backdrop-blur-xl fixed w-full top-0 left-0 z-50 dark:bg-neutral-950/50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/">
              <h1 className="text-2xl font-semibold">POSTBOX</h1>
            </Link>
            <div className="hidden gap-8 md:flex">
              <Link to="">Home</Link>
              <Link to="">Blog</Link>
              <Link to="">Contact</Link>
              <Link to="">About</Link>
            </div>
            <div className="space-x-3">
              {/* <input
                type="search"
                className="bg-gray-100 rounded-xl p-1 dark:bg-zinc-900"
              /> */}
              <div className="flex gap-3">
                <ModeToggle />
                <Avatar>
                  <AvatarImage src={profile1} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
