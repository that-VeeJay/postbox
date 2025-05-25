import { useState } from 'react';

import { AiOutlineLike } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropup } from 'react-icons/io';
import { AiOutlineDislike } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';

import { ReplyForm } from '../reply/ReplyForm';
import { ReplyList } from '../reply/ReplyList';
import { useGetReplies } from '../../hooks/useGetReplies';
import { useCheckRepliesExist } from '../../hooks/useCheckRepliesExist';

export function Interactions({ commentId }: { commentId: string }) {
   const [isReplyFieldOpen, setIsReplyFieldOpen] = useState(false);
   const [isReplyListOpen, setIsReplyListOpen] = useState(false);

   const {} = useGetReplies(commentId, isReplyListOpen);
   const { data } = useCheckRepliesExist(commentId);
   const hasReplies = data?.hasReplies === true;

   const toggleReplyField = () => setIsReplyFieldOpen((prev) => !prev);
   const toggleReplyList = () => setIsReplyListOpen((prev) => !prev);

   return (
      <>
         <div className="flex items-center gap-5">
            <AiOutlineLike />
            <AiOutlineDislike />
            <Button onClick={toggleReplyField} variant="ghost" type="button" className="text-sm">
               reply
            </Button>
         </div>
         {isReplyFieldOpen && (
            <ReplyForm commentId={commentId} setIsReplyFieldOpen={setIsReplyFieldOpen} />
         )}
         {/* List of comments */}
         {hasReplies && (
            <Button onClick={toggleReplyList} type="button" variant="secondary">
               {isReplyListOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
               replies
            </Button>
         )}
         {isReplyListOpen && <ReplyList commentId={commentId} />}
      </>
   );
}
