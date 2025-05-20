import { useContext } from "react";
import { LogOutIcon } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileIcon } from "@/components/icons/ProfileIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getImageUrl } from "@/utils/getImageUrl";
import { getFirstLetter } from "@/utils/getFirstLetter";

export default function Layout() {
  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useContext(UserContext);

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

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
              <Link to="/people">People</Link>
              <Link to="">Saved</Link>
            </div>
            <div className="space-x-3">
              <div className="flex items-center gap-3">
                <ModeToggle />
                {user ? (
                  <>
                    <Button>
                      <Link to="/create">Create</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage
                            src={getImageUrl(user?.profile_picture)}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {getFirstLetter(user?.name)}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex gap-2">
                            <ProfileIcon /> Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LogOutIcon />
                          <form onSubmit={handleLogout}>
                            <button>Logout</button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/login">Login</Link>
                    <Button>
                      <Link to="/register">Create account</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-18">
        <Outlet />
      </main>
    </>
  );
}
