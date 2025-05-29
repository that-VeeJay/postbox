import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { getImageUrl } from '@/utils/getImageUrl';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { EditProfile, AccountSettings } from '@/features/profile';
import defaultProfile from '../../assets/default_profile.png';
import { MapPin } from 'lucide-react';

export default function ProfileInfo() {
   const { user, token } = useContext(UserContext);

   return (
      <div className="flex flex-col items-center gap-5 md:flex-row">
         <div className="flex-shrink-0 space-y-2">
            <img
               src={user?.profile_picture ? getImageUrl(user?.profile_picture) : defaultProfile}
               alt="Profile"
               className="h-40 w-40 rounded-full object-cover"
            />
            <p className="text-center text-base text-neutral-400">@{user?.username}</p>
         </div>
         <div className="flex w-full flex-col items-center gap-3 md:items-start">
            <div className="flex w-full flex-grow flex-col gap-3 md:flex-row md:justify-between">
               <div className="space-y-1">
                  <p className="text-center text-3xl font-semibold md:text-left">
                     {capitalizeFirstLetter(user?.name)}
                  </p>
                  <div className="flex justify-center gap-1 md:justify-start">
                     {user?.location && (
                        <div className="flex items-center gap-2">
                           <MapPin />
                           <small>{user.location}</small>
                        </div>
                     )}
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <AccountSettings />

                  <EditProfile token={token} maxBioLength={150} user={user} />
               </div>
            </div>

            <div className="w-[80%] md:w-[50%]">
               <p className="text-sm">{user?.bio}</p>
            </div>
         </div>
      </div>
   );
}
