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
  const [dragging, setDragging] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <form>
      <div className="mx-auto w-full max-w-6xl p-5 pt-5">
        <div className="grid gap-5 md:grid-cols-5">
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
          <div className="col-span-3 space-y-5 md:col-span-2">
            {/* Image Upload */}
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              htmlFor="dropzone"
              className={`flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed bg-white transition dark:border-neutral-700 dark:bg-neutral-900 ${
                dragging
                  ? "!border-neutral-300 !bg-neutral-200 dark:!border-neutral-500 dark:!bg-neutral-950"
                  : "border-neutral-300"
              }`}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p>Click to upload or drag and drop</p>
                  <p className="text-xs">PNG, JPG or JPEG</p>
                </div>
              </div>
              <input
                id="dropzone"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            {/* Image Preview */}
            <div className="dark:border-gray block h-60 rounded-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="relative flex h-full items-center justify-center rounded-lg">
                {image && (
                  <div className="absolute bottom-0 left-0 z-20 block w-full bg-black/50 px-2 py-1 text-xs text-white">
                    Note: Preview only — final ratio may vary.
                  </div>
                )}
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="z-10 h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center">
                    <p className="text-xs">Image preview</p>
                  </div>
                )}
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
