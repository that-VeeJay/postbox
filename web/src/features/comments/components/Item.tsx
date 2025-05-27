import { useContext, useEffect } from 'react';
import { useRef, useState } from 'react';
import { timeAgo } from '@/utils';
import { CustomAvatar } from '@/components/shared';
import type { CommentType } from '../types';
import { Actions } from './Actions';
import { Edit } from './Edit';
import { UserContext } from '@/context/UserContext';
import { Interactions } from './Interactions';

export function Item({ comment }: { comment: CommentType }) {
   // rear more, show less
   const [expanded, setExpanded] = useState(false);
   const [isClamped, setIsClamped] = useState(false);
   const textRef = useRef<HTMLParagraphElement>(null);

   // comment editing
   const [isEditing, setIsEditing] = useState(false);
   const isEdited = comment.created_at !== comment.updated_at;

   // authenticated user
   const { user } = useContext(UserContext);
   const isOwner = user.id === comment.user.id;

   useEffect(() => {
      const el = textRef.current;
      el && setIsClamped(el.scrollHeight > el.clientHeight);
   }, []);

   console.log(comment);

   return (
      <article>
         {/* Author info */}
         <header className="flex justify-between">
            <div className="flex items-center gap-2">
               <CustomAvatar
                  image={comment.user.profile_picture}
                  alt="Vee Jay"
                  fallback="Vee Jay"
               />
               <h3 className="font-semibold">@{comment.user.username}</h3>
               <time className="text-sm text-neutral-600 dark:text-neutral-400">
                  {timeAgo(comment.created_at)}
               </time>
               {isEdited && (
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">(edited)</span>
               )}
            </div>
            {isOwner && <Actions setIsEditing={setIsEditing} commentId={comment.id} />}
         </header>

         {/* Comment Content */}
         <section className="ml-12 space-y-2">
            {isEditing ? (
               <Edit
                  commentBody={comment.body}
                  commentId={comment.id}
                  setIsEditing={setIsEditing}
               />
            ) : (
               <>
                  <p
                     ref={textRef}
                     className={`mr-12 transition-all ${expanded ? '' : 'line-clamp-2'}`}
                  >
                     {comment.body}
                  </p>

                  {isClamped && (
                     <button
                        type="button"
                        className="text-neutral-600 hover:underline dark:text-neutral-400"
                        onClick={() => setExpanded((prev) => !prev)}
                     >
                        {expanded ? 'Show less' : 'Read more'}
                     </button>
                  )}
                  <Interactions />
               </>
            )}
         </section>

         {/* Interactions */}
         <footer></footer>
      </article>
   );
}
