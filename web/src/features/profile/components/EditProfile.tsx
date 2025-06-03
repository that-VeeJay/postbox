import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Pen } from 'lucide-react';
import EditProfileForm from './ui/EditProfileForm';

type Props = {
   maxBioLength: number;
   token: string | null;
   user: any;
};

export type ProfileDataType = Partial<{
   name: string;
   location: string;
   bio: string;
   profile_picture: File | null;
}>;

const initialValues = { name: '', location: '', bio: '' };

export default function EditProfile({ maxBioLength, token, user }: Props) {
   const queryClient = useQueryClient();
   const [bioLength, setBioLength] = useState('');
   const [nameFieldError, setNameFieldError] = useState('');
   const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
   const [profileData, setProfileData] = useState<ProfileDataType>(initialValues);

   // Set form data when user is loaded
   useEffect(() => {
      if (user) {
         setProfileData({
            name: user.name || '',
            location: user.location || '',
            bio: user.bio || '',
         });
      }
   }, [user]);

   // handle image upload
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setProfileData((prev) => ({ ...prev, profile_picture: file }));
      }
   };

   // handle input change
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProfileData((prev) => ({ ...prev, [name]: value }));
   };

   const { mutate } = useMutation({
      mutationFn: async (userInfo: any) => {
         const formData = new FormData();

         formData.append('_method', 'PATCH');
         if (userInfo.name !== undefined) formData.append('name', userInfo.name);
         if (userInfo.location !== undefined) formData.append('location', userInfo.location);
         if (userInfo.bio !== undefined) formData.append('bio', userInfo.bio);
         if (userInfo.profile_picture instanceof File && userInfo.profile_picture !== null) {
            formData.append('profile_picture', userInfo.profile_picture);
         }
         const response = await fetch('/api/profile/update', {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: formData,
         });
         const data = await response.json();
         return data;
      },
      onSuccess: (data) => {
         if (data.errors) {
            setNameFieldError(data.errors.name[0]);
            return;
         }
         setUpdateSuccessMessage('Profile updated successfully.');
         setNameFieldError('');
         queryClient.invalidateQueries({ queryKey: ['user'] });
      },
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(profileData);
   };

   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="outline">
               <Pen />
               Edit Profile
            </Button>
         </SheetTrigger>
         <SheetContent>
            <EditProfileForm
               user={user}
               profileData={profileData}
               bioLength={bioLength}
               nameFieldError={nameFieldError}
               maxBioLength={maxBioLength}
               updateSuccessMessage={updateSuccessMessage}
               setProfileData={setProfileData}
               setUpdateSuccessMessage={setUpdateSuccessMessage}
               setBioLength={setBioLength}
               handleChange={handleChange}
               handleFileChange={handleFileChange}
               handleSubmit={handleSubmit}
            />
         </SheetContent>
      </Sheet>
   );
}
