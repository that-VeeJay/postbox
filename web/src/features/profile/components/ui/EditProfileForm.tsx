import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import InputFieldError from '@/components/shared/InputFieldError';
import { SheetClose, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Note } from '@/components/shared';
import { Save, X } from 'lucide-react';

type Props = {
   user: any;
   profileData: any;
   bioLength: string;
   nameFieldError: string;
   maxBioLength: number;
   updateSuccessMessage: string;
   setProfileData: any;
   setUpdateSuccessMessage: any;
   setBioLength: any;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function EditProfileForm(props: Props) {
   const {
      user,
      profileData,
      bioLength,
      nameFieldError,
      maxBioLength,
      updateSuccessMessage,
      setProfileData,
      setUpdateSuccessMessage,
      setBioLength,
      handleChange,
      handleFileChange,
      handleSubmit,
   } = props;

   return (
      <>
         <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
               Make changes to your profile here. Click save changes when you're done.
            </SheetDescription>
         </SheetHeader>
         <form onSubmit={handleSubmit}>
            <div className="space-y-5 px-5">
               {updateSuccessMessage && (
                  <Note message={updateSuccessMessage} type="success" />
                  //  <CustomToast message={updateSuccessMessage} type="success" />
               )}
               <div className="space-y-2">
                  <Label htmlFor="">Name</Label>
                  <Input name="name" value={profileData.name} onChange={handleChange} />
                  <InputFieldError error={nameFieldError} />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="">Location</Label>
                  <Input name="location" value={profileData.location} onChange={handleChange} />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="">Bio</Label>
                  <Textarea
                     maxLength={maxBioLength}
                     name="bio"
                     value={profileData.bio}
                     className="resize-none"
                     onChange={(e) => {
                        setBioLength(e.target.value);
                        handleChange(e);
                     }}
                  />
                  <p className="text-xs">
                     {bioLength.length}/{maxBioLength}
                  </p>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="">Profile picture</Label>
                  <Input
                     type="file"
                     accept="image/*"
                     name="profile_picture"
                     onChange={handleFileChange}
                  />
                  <SheetDescription>
                     Note: Please allow a few seconds for your updated profile picture to be visible
                     throughout the site.
                  </SheetDescription>
               </div>
               <div className="flex gap-3">
                  <SheetClose asChild>
                     <Button
                        variant="outline"
                        onClick={() => {
                           setProfileData({
                              name: user.name || '',
                              location: user.location || '',
                              bio: user.bio || '',
                           });
                           setUpdateSuccessMessage('');
                        }}
                        className="flex-1"
                     >
                        <X />
                        Close
                     </Button>
                  </SheetClose>

                  <Button type="submit" className="flex-2">
                     <Save />
                     Save Changes
                  </Button>
               </div>
            </div>
         </form>
      </>
   );
}
