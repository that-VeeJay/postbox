import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import { Button } from '@/components/ui/button';
import useToast from '@/hooks/useToast';
import { Link } from 'react-router-dom';

export default function HomePage() {
   useToast('delete_success');
   useToast('publish_success');
   return (
      <main className="mx-auto w-full max-w-6xl">
         <div className="mb-25">
            <SectionOne />
         </div>

         <div className="mt-10 mb-5 text-lg font-semibold md:text-xl">Recent Posts</div>
         <div className="grid lg:grid-cols-2">
            <SectionTwo />
         </div>

         <div className="mt-10 mb-5 text-lg font-semibold md:text-xl">All Blog Posts</div>
         <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <SectionThree />
         </div>

         {/* View the all-posts button */}
         <div className="mt-8 text-center">
            <Link to="/posts">
               <Button variant="outline">View all posts</Button>
            </Link>
         </div>
      </main>
   );
}
