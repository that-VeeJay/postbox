import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RefineDialogBoxProps {
  refinements: { text: string };
  setRefinements: React.Dispatch<React.SetStateAction<{ text: string }>>;
  MAX_REFINE_LENGTH: number;
}

export default function RefineDialogBox({
  refinements,
  setRefinements,
  MAX_REFINE_LENGTH,
}: RefineDialogBoxProps) {
  const [text, setText] = useState<string>("");
  return (
    <Dialog>
      <DialogTrigger className="text-sm" asChild>
        <Button variant="outline">Refine</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refine output with context</DialogTitle>
          <DialogDescription>
            Provide relevant details or background so the AI can generate more
            accurate and meaningful responses.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-2">
          <Textarea
            maxLength={MAX_REFINE_LENGTH}
            onChange={(e) => {
              setText(e.target.value);
              setRefinements({
                ...refinements,
                text: e.target.value,
              });
            }}
            className="resize-none"
            placeholder="Start writing..."
            id="refinements_form"
            value={refinements.text}
          />
          <p className="text-xs">
            {text.length}/{MAX_REFINE_LENGTH}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
