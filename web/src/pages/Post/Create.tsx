import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Spinner from '@/components/icons/Spinner';
import {
   ImageUpload,
   ImagePreview,
   GenerateNote,
   CategorySelect,
   RefineDialogBox,
} from '@/features/posts';

import { Send, Paperclip, Bot } from 'lucide-react';

import type { CreateInputDataProps, CreateErrorsType } from '@/features/posts/types';
import { useGenerateContent } from '@/features/posts/hooks/useGenerateContent';
import { useSubmitCreate } from '@/features/posts/hooks/useSubmitCreate';
import { InputFieldError } from '@/components/shared';
import { TextEditor, PostingGuidelines } from '@/features/create';

const MAX_TITLE_LENGTH = 8;

const initialValues: CreateInputDataProps = {
   title: '',
   body: '',
   category: '',
   image: null,
};

export default function Create() {
   const [inputData, setInputData] = useState<CreateInputDataProps>(initialValues);
   const [refinements, setRefinements] = useState({ text: '' });
   const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [errors, setErrors] = useState<CreateErrorsType>({});

   // handle AI content generation
   const { generateContent, aiPending } = useGenerateContent({
      title: inputData.title,
      context: refinements.text,
      onSuccess: (generatedArticle: string) =>
         setInputData((prev) => ({ ...prev, body: generatedArticle })),
   });

   const { submitForm, isPending } = useSubmitCreate({
      setErrors,
      setInputData,
      setImagePreview,
      initialValues,
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submitForm(inputData);
   };

   const onChange = (content: string) => {
      setInputData({ ...inputData, body: content });
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
                           value={inputData.title}
                           onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
                        />
                        {errors.title && <InputFieldError error={errors.title} />}
                     </div>

                     <div>
                        <TextEditor content={inputData.body} onChange={onChange} />
                        {errors.body && <InputFieldError error={errors.body} />}
                     </div>

                     <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-3">
                           <Button
                              type="button"
                              disabled={inputData.title.length <= MAX_TITLE_LENGTH || aiPending}
                              onClick={(e) => {
                                 e.preventDefault();
                                 generateContent();
                              }}
                           >
                              <Bot />
                              {aiPending ? (
                                 <div className="flex items-center gap-1">
                                    <Spinner />
                                    Generating content...
                                 </div>
                              ) : (
                                 'Generate with AI'
                              )}
                           </Button>
                           <GenerateNote />
                        </div>
                        <RefineDialogBox setRefinements={setRefinements} />
                     </div>
                  </div>
               </div>

               {/* Right Side */}
               <div className="col-span-3 flex flex-col space-y-5 md:col-span-2">
                  <ImageUpload
                     setInputData={setInputData}
                     setImagePreview={setImagePreview}
                     errors={errors}
                  />

                  <ImagePreview imagePreview={imagePreview} />

                  <CategorySelect
                     setInputData={setInputData}
                     inputData={inputData}
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
                           <Send />
                           <p>Publish</p>
                        </div>
                     )}
                  </Button>

                  <div className="flex w-full min-w-0 items-center gap-3 overflow-x-auto">
                     <Separator className="min-w-[20px] flex-1" />
                     <span className="px-2 text-sm whitespace-nowrap text-neutral-500">or</span>
                     <Separator className="min-w-[20px] flex-1" />
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                     <Paperclip />
                     Save as draft
                  </Button>

                  <div className="mt-auto cursor-pointer text-center text-neutral-400 hover:underline">
                     <PostingGuidelines />
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
}
