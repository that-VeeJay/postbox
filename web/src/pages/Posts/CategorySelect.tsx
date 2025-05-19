import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import InputFieldError from "@/components/shared/InputFieldError";
import { useState } from "react";
import type { FormDataType } from "./Index";

type ErrorsType = {
  title?: string;
  body?: string;
  category?: string;
  image?: string;
};

type Props = {
  setPostData: React.Dispatch<React.SetStateAction<FormDataType>>;
  postData: FormDataType;
  errors: ErrorsType;
};

export default function CategorySelect({
  setPostData,
  postData,
  errors,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(postData.category || "");
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-12 w-full justify-between"
          >
            {value
              ? categories.find((category) => category.value === value)?.label
              : "Select category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setPostData({
                        ...postData,
                        category: currentValue,
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errors.category && <InputFieldError error={errors.category} />}
    </>
  );
}
