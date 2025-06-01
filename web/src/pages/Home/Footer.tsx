import { Link } from 'react-router-dom';
import { Youtube, Facebook, Mail } from 'lucide-react';

export function Footer() {
   return (
      <footer>
         <div className="-space-y-5 px-5">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
               <section className="place-items-center">
                  <h4 className="text-3xl font-bold">POSTBOX</h4>
                  <p className="text-sm text-neutral-300">
                     Stories that spark ideas. Posts that matter.
                  </p>
                  <p className="text-xs text-neutral-300">© 2025. All rights reserved</p>
               </section>
               <div className="md:place-items-center">
                  <nav className="flex flex-col gap-5">
                     <Link to="#">Home</Link>
                     <Link to="#">Followed</Link>
                     <Link to="#">People</Link>
                     <Link to="#">Saved</Link>
                  </nav>
               </div>
               <nav className="md:place-items-center">
                  <div className="flex flex-col gap-5">
                     <Link to="#" className="flex items-center gap-3">
                        <Facebook />
                        Facebook
                     </Link>
                     <Link to="#" className="flex items-center gap-3">
                        <Youtube />
                        Youtube
                     </Link>
                     <Link to="#" className="flex items-center gap-3">
                        <Mail />
                        Mail
                     </Link>
                  </div>
               </nav>
            </div>
            <div className="mt-20 overflow-hidden px-6 lg:mt-0">
               <h1 className="hidden translate-y-25 text-center text-[12vw] leading-none font-semibold tracking-tight text-white uppercase lg:block">
                  POSTBOX
               </h1>
            </div>
         </div>
      </footer>
   );
}
