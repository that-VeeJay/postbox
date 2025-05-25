import { useParams } from 'react-router-dom';
import { Form } from './Form';
import { List } from './List';
import { Count } from './Count';
import { useGetComments } from '../../hooks/useGetComments';

export function CommentSection() {
   const { id: postId } = useParams();
   const { data: comments, isLoading } = useGetComments(postId!);

   return (
      <div className="space-y-10">
         <Count count={comments?.length} />
         <Form />
         <List comments={comments} isLoading={isLoading} />
      </div>
   );
}
