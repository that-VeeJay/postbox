import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';

import { ThumbsUp, Trash, Save, Settings } from 'lucide-react';

export default function AccountSettings() {
   return (
      <Sheet>
         <SheetTrigger>
            <Settings />
         </SheetTrigger>
         <SheetContent>
            <SheetHeader>
               <SheetTitle className="m-0">Account Settings</SheetTitle>
               <SheetDescription>
                  Update your account details here. Don't forget to save your changes when you're
                  finished.
               </SheetDescription>
            </SheetHeader>
            <form>
               <div className="space-y-5 px-5">
                  <Separator />
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" name="email" />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="username">Username</Label>
                     <Input id="username" name="username" />
                  </div>

                  <Separator />
                  <p className="m-0">Update password</p>
                  <SheetDescription>
                     Ensure your account is using a long, random password to stay secure.
                  </SheetDescription>

                  <div className="space-y-2">
                     <Label htmlFor="current_password">Current Password</Label>
                     <Input id="current_password" name="current_password" />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="new_password">New Password</Label>
                     <Input id="new_password" name="new_password" />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="confirm_password">Confirm Password</Label>
                     <Input id="confirm_password" name="confirm_password" />
                  </div>

                  <SheetClose asChild>
                     <Button type="submit" className="w-full">
                        <Save />
                        Update Account
                     </Button>
                  </SheetClose>
                  <Separator />
                  <p className="m-0">Delete account</p>
                  <SheetDescription>
                     Deleting your account will permanently remove all data. Please download any
                     information you want to keep beforehand.
                  </SheetDescription>
                  <Dialog>
                     <DialogTrigger asChild>
                        <Button type="button" variant="destructive">
                           <Trash />
                           Delete account
                        </Button>
                     </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Are you absolutely sure?</DialogTitle>
                           <DialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                           </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                           <Button variant="destructive">
                              <ThumbsUp />
                              Yes, delete account
                           </Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </div>
            </form>
         </SheetContent>
      </Sheet>
   );
}
