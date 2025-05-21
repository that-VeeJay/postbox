import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaInfo } from "react-icons/fa";

export default function GenerateNote() {
  return (
    <Popover>
      <PopoverTrigger>
        <FaInfo />
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm select-none">
          <span className="font-bold">Note: </span>AI-generated content is
          intended as a starting point for your article. Please review and
          verify all information, as it may contain inaccuracies.
        </p>
      </PopoverContent>
    </Popover>
  );
}
