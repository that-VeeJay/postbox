import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
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
import InfoIcon from "@/components/icons/InfoIcon";

const MAX_LENGTH = 150;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function Create() {
  const [text, setText] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <form>
      <div className="mx-auto w-full max-w-6xl pt-5">
        <div className="grid grid-cols-5 gap-5">
          {/* Left Side */}
          <div className="col-span-3">
            <div className="space-y-5">
              <Input placeholder="Title" className="p-5" />
              <Textarea
                placeholder="Share your story..."
                className="h-170 resize-none"
              />
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <Button>Generate with AI</Button>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon />
                    </PopoverTrigger>
                    <PopoverContent>
                      <p className="text-sm">
                        <span className="font-bold">Note: </span>AI-generated
                        content is intended as a starting point for your
                        article. Please review and verify all information, as it
                        may contain inaccuracies.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                <Dialog>
                  <DialogTrigger className="text-sm" asChild>
                    <Button variant="outline">Refine</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Refine output with context</DialogTitle>
                      <DialogDescription>
                        Provide relevant details or background so the AI can
                        generate more accurate and meaningful responses.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full space-y-2">
                      <Textarea
                        maxLength={MAX_LENGTH}
                        onChange={(e) => setText(e.target.value)}
                        className="resize-none"
                        placeholder="Start writing..."
                      />
                      <p className="text-xs">
                        {text.length}/{MAX_LENGTH}
                      </p>
                    </div>
                    <DialogFooter>
                      <Button>Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="col-span-2 space-y-5">
            {/* Image Upload */}
            <label
              htmlFor="dropzone"
              className="dark:border-gray block h-32 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100 p-5 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p>Click to upload or drag and drop</p>
                  <p className="text-xs">PNG, JPG or JPEG</p>
                </div>
              </div>
              <input id="dropzone" type="file" className="hidden" />
            </label>

            {/* Image Preview */}
            <div className="dark:border-gray block h-60 rounded-lg border border-neutral-300 bg-neutral-100 p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-xs">Image preview</p>
                </div>
              </div>
            </div>

            {/* Category Select */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="h-12 w-full justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Submit Button */}
            <Button className="w-full">Publish</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
