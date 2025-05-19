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
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
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
import { categories } from "@/data/categories";
import InputFieldError from "@/components/shared/InputFieldError";
import Spinner from "@/components/icons/Spinner";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

type FormField = "title" | "body" | "category" | "image";

type FormDataType = {
  title: string;
  body: string;
  category: string;
  image: File | null;
};

type ErrorsType = {
  [key in FormField]?: string;
};

const MAX_REFINE_LENGTH = 150;
const MAX_TITLE_LENGTH = 8;

const initialValues: FormDataType = {
  title: "",
  body: "",
  category: "",
  image: null,
};

export default function Create() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const [refinements, setRefinements] = useState({ text: "" });
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const [postData, setPostData] = useState<FormDataType>(initialValues);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isPublishLoading, setIsPublishLoading] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      setPostData((prev) => ({ ...prev, image: file }));
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
      setPostData((prev) => ({ ...prev, image: file }));
    }
  };

  // handle AI content generation
  const handleAIGenerate = async () => {
    setAiLoading(true);
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
              {
                role: "user",
                content: `Write a well-structured blog post based on the title: "${postData.title}". Use the following context to guide the content and add depth where appropriate: "${refinements.text}". Avoid using Markdown formatting. Return plain text only. Instead of *, use • if you want to create a list`,
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const aiContent =
        data.choices?.[0]?.message?.content || "No content generated.";
      setPostData({ ...postData, body: aiContent });
    } catch (error) {
      console.error("There is an error: " + error);
    } finally {
      setAiLoading(false);
    }
  };

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", postData.title);
      formData.append("body", postData.body);
      formData.append("category", postData.category);
      postData.image && formData.append("image", postData.image);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      if (data.errors) {
        setErrors(data.errors);
        return;
      } else {
        setPostData(initialValues);
        setImage(null);
        navigate("/", {
          state: {
            publish_success: "Great job! Your blog post is now live. 🎉",
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPublishLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto w-full max-w-6xl p-5 pt-5">
        <div className="grid gap-5 md:grid-cols-5">
          {/* Left Side */}
          <div className="col-span-3">
            <div className="space-y-5">
              <div>
                <Input
                  placeholder="Title"
                  className="p-5"
                  value={postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                />
                {errors.title && <InputFieldError error={errors.title} />}
              </div>

              <div>
                <Textarea
                  placeholder="Share your story..."
                  className="scrollbar-hidden h-170 resize-none"
                  value={postData.body}
                  onChange={(e) =>
                    setPostData({ ...postData, body: e.target.value })
                  }
                />
                {errors.body && <InputFieldError error={errors.body} />}
              </div>

              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    disabled={
                      postData.title.length > MAX_TITLE_LENGTH ? false : true
                    }
                    onClick={handleAIGenerate}
                  >
                    {aiLoading ? (
                      <div className="flex items-center gap-1">
                        <Spinner />
                        Generating content...
                      </div>
                    ) : (
                      "Generate with AI"
                    )}
                  </Button>
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
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-3 space-y-5 md:col-span-2">
            {/* Image Upload */}
            <div>
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
                  name="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {errors.image && <InputFieldError error={errors.image} />}
            </div>
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
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-12 w-full justify-between"
                  >
                    {value
                      ? categories.find((category) => category.value === value)
                          ?.label
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
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
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
                                value === category.value
                                  ? "opacity-100"
                                  : "opacity-0",
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
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPublishLoading}
            >
              {isPublishLoading ? (
                <div className="flex items-center gap-1">
                  <Spinner />
                  <p>Please wait...</p>
                </div>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
