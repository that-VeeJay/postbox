import { useState } from 'react';

import { FaBrain } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/icons/Spinner';
import {
   ImageUpload,
   ImagePreview,
   GenerateNote,
   CategorySelect,
   RefineDialogBox,
} from '@/features/posts';

import type { CreateInputDataProps, CreateErrorsType } from '@/features/posts/types';
import { useGenerateContent } from '@/features/posts/hooks/useGenerateContent';
import { useSubmitCreate } from '@/features/posts/hooks/useSubmitCreate';

import { TextEditor } from '@/features/create';

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
                     </div>

                     <TextEditor content={inputData.body} onChange={onChange} />

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
                              <FaBrain />
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
               <div className="col-span-3 space-y-5 md:col-span-2">
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
