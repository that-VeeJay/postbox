import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';

export function PostingGuidelines() {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <p className="text-sm">Posting guidelines. Please read.</p>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  <p className="text-xl">Posting Guidelines</p>
               </AlertDialogTitle>
               <AlertDialogDescription>
                  <h3 className="text-base font-bold">Quality over Quantity</h3>
                  <p>
                     Focus on quality, not quantity. Deliver well-researched, informative, and
                     engaging content that truly adds value to your readers.
                  </p>
                  <div className="py-3">
                     <Separator />
                  </div>
                  <h3 className="text-base font-bold">Proper Formatting</h3>
                  <p>
                     Structure your post effectively using headings, subheadings, bullet points, and
                     clear paragraphs to enhance readability and user experience.
                  </p>
                  <div className="py-3">
                     <Separator />
                  </div>
                  <h3 className="text-base font-bold">Promote Ethical Practices</h3>
                  <p>
                     Avoid engaging in unethical practices such as clickbait titles, misleading
                     information, or deceptive tactics to attract readers. Build trust with your
                     audience through transparency and honesty.
                  </p>
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogAction>I agree</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
