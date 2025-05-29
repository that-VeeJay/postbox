import { useState } from 'react';

import { BrushCleaning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';

type RefineDialogBoxProps = {
   setRefinements: React.Dispatch<React.SetStateAction<{ text: string }>>;
};

const MAX_REFINE_LENGTH = 150;

export default function RefineDialogBox({ setRefinements }: RefineDialogBoxProps) {
   const [inputData, setInputData] = useState({ text: '' });

   return (
      <Dialog>
         <DialogTrigger className="text-sm" asChild>
            <Button variant="outline">
               <BrushCleaning />
               Refine
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Refine output with context</DialogTitle>
               <DialogDescription>
                  Provide relevant details or background so the AI can generate more accurate and
                  meaningful responses.
               </DialogDescription>
            </DialogHeader>
            <div className="w-full space-y-2">
               <Textarea
                  maxLength={MAX_REFINE_LENGTH}
                  onChange={(e) => {
                     setInputData({ text: e.target.value });
                     setRefinements({ text: e.target.value });
                  }}
                  className="resize-none"
                  placeholder="Start writing..."
                  id="refinements_form"
                  value={inputData.text}
               />
               <p className="text-xs">
                  {inputData.text.length}/{MAX_REFINE_LENGTH}
               </p>
            </div>
         </DialogContent>
      </Dialog>
   );
}
