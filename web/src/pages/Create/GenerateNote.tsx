import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InfoIcon from "@/components/icons/InfoIcon";

export default function GenerateNote() {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon />
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">
          <span className="font-bold">Note: </span>AI-generated content is
          intended as a starting point for your article. Please review and
          verify all information, as it may contain inaccuracies.
        </p>
      </PopoverContent>
    </Popover>
  );
}
