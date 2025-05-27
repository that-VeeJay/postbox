import { Item } from './Item';
import { useGetComments } from '../hooks/useGetComments';
import type { CommentType } from '../types';

export function List({ postId }: { postId: string }) {
    const { data: comments = [] } = useGetComments(postId);

   return (
      <div className="space-y-8">
         {comments.map((comment: CommentType) => (
            <Item key={comment.id} comment={comment} />
         ))}
      </div>
   );
}
