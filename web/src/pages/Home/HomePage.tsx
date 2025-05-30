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
         {/* <SectionOne /> */}
         <div className="mb-5 text-lg font-semibold md:text-xl lg:mt-30">Recent Posts</div>
         <div className="grid lg:grid-cols-2">
            <SectionTwo />
         </div>

         <div className="mb-5 text-lg font-semibold md:text-xl lg:mt-15">All Blog Posts</div>
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
