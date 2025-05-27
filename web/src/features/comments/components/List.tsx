import { Item } from './Item';

import type { CommentType } from '../types';
import { Note } from '@/components/shared';

type ListProps = {
   comments: CommentType[];
};

export function List({ comments }: ListProps) {
   return (
      <>
         {comments.length > 0 ? (
            <div className="space-y-8">
               {comments.map((comment: CommentType) => (
                  <Item key={comment.id} comment={comment} />
               ))}
            </div>
         ) : (
            <Note
               message="No comments yet... Be the first to start the conversation!"
               type="info"
            />
         )}
      </>
   );
}
