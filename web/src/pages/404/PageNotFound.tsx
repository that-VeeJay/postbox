import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PageNotFound() {
   return (
      <div className="flex min-h-screen items-center justify-center">
         <div className="space-y-1">
            <div>
               <p>
                  <span className="font-semibold">Error code:</span> 404
               </p>
               <div className="text-3xl font-bold">OOOPS!!!</div>
            </div>
            <p>This is not the page you are looking for.</p>
            <Button asChild>
               <Link to="/">Go back home</Link>
            </Button>
         </div>
      </div>
   );
}
