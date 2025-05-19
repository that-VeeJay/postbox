import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState } from "react";
import InputFieldError from "@/components/shared/InputFieldError";
import Spinner from "@/components/icons/Spinner";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import CategorySelect from "./CategorySelect";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import GenerateNote from "./GenerateNote";
import RefineDialogBox from "./RefineDialogBox";

type FormField = "title" | "body" | "category" | "image";

export type FormDataType = {
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

export default function Index() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [refinements, setRefinements] = useState({ text: "" });
  const [postData, setPostData] = useState<FormDataType>(initialValues);
  const [errors, setErrors] = useState<ErrorsType>({});

  // handle AI content generation
  const { mutate: generateContent, isPending: aiPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: import.meta.env.VITE_LARGE_LANG_MODEL,
            messages: [
              {
                role: "user",
                content: `Write a well-structured blog post based on the title: "${postData.title}". Use the following context to guide the content and add depth where appropriate: "${refinements.text}". Avoid using Markdown formatting. Return plain text only. Instead of *, use • if you want to create a list`,
              },
            ],
          }),
        },
      );
      return response.json();
    },
    onSuccess: (data) => {
      const aiContent =
        data.choices?.[0]?.message?.content || "No content generated.";
      setPostData({ ...postData, body: aiContent });
    },
    onError: (error) => {
      console.error("AI generation failed", error);
    },
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
                      postData.title.length > MAX_TITLE_LENGTH
                        ? false
                        : true || aiPending
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      generateContent();
                    }}
                  >
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
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
