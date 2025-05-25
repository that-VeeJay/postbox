import { Link, Outlet } from 'react-router-dom';
import { memo, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { NavigationLinks, ProfileDropdown } from '@/features/navbar';
import { UserContext } from '@/context/UserContext';

export default memo(function Layout() {
   const { user } = useContext(UserContext);
   return (
      <>
         <header>
            <nav className="fixed top-0 left-0 z-50 w-full bg-white/50 p-5 backdrop-blur-xl dark:bg-neutral-950/50">
               <div className="container mx-auto flex items-center justify-between">
                  <Link to="/">
                     <h1 className="text-2xl font-semibold">POSTBOX</h1>
                  </Link>
                  <div className="hidden gap-8 font-medium md:flex">
                     <NavigationLinks />
                  </div>
                  <div className="space-x-3">
                     <div className="flex items-center gap-3">
                        <ModeToggle />
                        {user ? (
                           <>
                              <Button asChild>
                                 <Link to="/create">Create</Link>
                              </Button>
                              <ProfileDropdown />
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
});
