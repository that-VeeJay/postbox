import { Card } from './Card';
import { CommentLoadSkeleton } from '@/components/skeletons/CommentLoadSkeleton';
import { Note } from '@/components/shared';
import type { CommentType } from '../../types';

type PropsType = {
   comments: CommentType[];
   isLoading: boolean;
};

export function List({ comments, isLoading }: PropsType) {
   if (isLoading) return <CommentLoadSkeleton />;

   if (!comments || comments.length === 0)
      return <Note message="This place is empty... for now. Drop a comment!" type="info" />;

   return (
      <div className="space-y-6">
         {comments.map((comment: any) => (
            <Card key={comment.id} comment={comment} />
         ))}
      </div>
   );
}
