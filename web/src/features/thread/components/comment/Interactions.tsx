import { useState } from 'react';

import { AiOutlineLike } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropup } from 'react-icons/io';
import { AiOutlineDislike } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';

import { ReplyForm } from '../reply/ReplyForm';
import { useGetReplies } from '../../hooks/useGetReplies';
import { useCheckRepliesExist } from '../../hooks/useCheckRepliesExist';
import { List } from './List';

export function Interactions({ commentId, parentId }: { commentId: string; parentId: number }) {
   const [isReplyFieldOpen, setIsReplyFieldOpen] = useState(false);
   const [isReplyListOpen, setIsReplyListOpen] = useState(false);

   const { data: comments, isLoading } = useGetReplies(commentId, isReplyListOpen);
   const { data } = useCheckRepliesExist(commentId);
   const hasReplies = data?.hasReplies === true;

   const toggleReplyField = () => setIsReplyFieldOpen((prev) => !prev);
   const toggleReplyList = () => setIsReplyListOpen((prev) => !prev);

   const isReply = parentId === null;

   return (
      <>
         <div className="flex items-center gap-5">
            <AiOutlineLike />
            <AiOutlineDislike />

            {isReply && (
               <Button onClick={toggleReplyField} variant="ghost" type="button" className="text-sm">
                  reply
               </Button>
            )}
         </div>
         {isReplyFieldOpen && (
            // TODO: Fix issue
            <ReplyForm commentId={commentId} setIsReplyFieldOpen={setIsReplyFieldOpen} />
         )}
         {/* List of comments */}
         {hasReplies && (
            <Button onClick={toggleReplyList} type="button" variant="secondary">
               {isReplyListOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
               replies
            </Button>
         )}
         {isReplyListOpen && <List comments={comments} isLoading={isLoading} />}
      </>
   );
}
