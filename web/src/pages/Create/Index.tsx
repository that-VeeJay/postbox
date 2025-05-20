import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/icons/Spinner";
import { Textarea } from "@/components/ui/textarea";
import { UserContext } from "@/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import InputFieldError from "@/components/shared/InputFieldError";

import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import GenerateNote from "./GenerateNote";
import CategorySelect from "./CategorySelect";
import RefineDialogBox from "./RefineDialogBox";

import { FaBrain } from "react-icons/fa6";

import { useGenerateContent } from "@/hooks/useGenerateContent";

type FormField = "title" | "body" | "category" | "image";

export type FormDataType = {
  title: string;
  body: string;
  category: string;
  image: File | null;
};

export type ErrorsType = Partial<Record<FormField, string>>;

const MAX_REFINE_LENGTH = 150;
const MAX_TITLE_LENGTH = 8;

const initialValues: FormDataType = {
  title: "",
  body: "",
  category: "",
  image: null,
};

export default function Index() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [image, setImage] = useState<string | null>(null);
  const [refinements, setRefinements] = useState({ text: "" });
  const [postData, setPostData] = useState<FormDataType>(initialValues);
  const [errors, setErrors] = useState<ErrorsType>({});

  // handle AI content generation
  const { generateContent, aiPending } = useGenerateContent({
    title: postData.title,
    context: refinements.text,
    onSuccess: (content: string) =>
      setPostData((prev) => ({ ...prev, body: content })),
  });

  // handle form submission
  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: async () => {
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
      return response.json();
    },
    onSuccess: (data) => {
      if (data.errors) {
        setErrors(data.errors);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPostData(initialValues);
      setImage(null);
      navigate("/", {
        state: {
          publish_success: "Great job! Your blog post is now live. 🎉",
        },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
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
                      postData.title.length <= MAX_TITLE_LENGTH || aiPending
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      generateContent();
                    }}
                  >
                    <FaBrain />
                    {aiPending ? (
                      <div className="flex items-center gap-1">
                        <Spinner />
                        Generating content...
                      </div>
                    ) : (
                      "Generate with AI"
                    )}
                  </Button>
                  <GenerateNote />
                </div>
                <RefineDialogBox
                  refinements={refinements}
                  setRefinements={setRefinements}
                  MAX_REFINE_LENGTH={MAX_REFINE_LENGTH}
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-3 space-y-5 md:col-span-2">
            <ImageUpload
              setPostData={setPostData}
              setImage={setImage}
              errors={errors}
            />

            <ImagePreview image={image} />

            <CategorySelect
              setPostData={setPostData}
              postData={postData}
              errors={errors}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-1">
                  <Spinner />
                  <p>Please wait...</p>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <p>Publish</p>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
