import { useMutation } from '@tanstack/react-query';
import type { CreateInputDataProps, CreateErrorsType } from '../types';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type UseSubmitCreateProps = {
   setErrors: React.Dispatch<React.SetStateAction<CreateErrorsType>>;
   setInputData: React.Dispatch<React.SetStateAction<CreateInputDataProps>>;
   setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
   initialValues: CreateInputDataProps;
};

export function useSubmitCreate({
   setErrors,
   setInputData,
   setImagePreview,
   initialValues,
}: UseSubmitCreateProps) {
   const { token } = useContext(UserContext);
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: async (inputData: CreateInputDataProps) => {
         const formData = new FormData();
         formData.append('title', inputData.title);
         formData.append('body', inputData.body);
         formData.append('category', inputData.category);
         inputData.image && formData.append('image', inputData.image);

         const response = await fetch('/api/posts', {
            method: 'POST',
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
         queryClient.invalidateQueries({ queryKey: ['posts'] });
         setInputData(initialValues);
         setImagePreview(null);
         navigate('/', {
            state: {
               publish_success: 'Great job! Your blog post is now live. 🎉',
            },
         });
      },
   });
   return {
      submitForm: mutation.mutate,
      isPending: mutation.isPending,
   };
}
