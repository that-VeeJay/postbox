import { useMutation } from "@tanstack/react-query";

type Params = {
  title: string;
  context: string;
  onSuccess: (content: string) => void;
};

export function useGenerateContent({ title, context, onSuccess }: Params) {
  const { mutate, isPending } = useMutation({
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
                content: `Write a clear and well-structured blog post based on the title: "${title}". Use the following context to add insight and depth: "${context}". Do not repeat the title in the content. Avoid Markdown—return plain text only. Use • for lists instead of *.`,
              },
            ],
          }),
        },
      );
      return response.json();
    },
    onSuccess: (data) => {
      const content =
        data.choices?.[0]?.message?.content || "No content generated.";
      onSuccess(content);
    },
    onError: (error) => {
      console.error("AI generation failed", error);
    },
  });

  return { generateContent: mutate, aiPending: isPending };
}
