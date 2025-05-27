import { useParams } from 'react-router-dom';
import Form from './Form';
import { List } from './List';
import { Count } from './Count';
import { useGetComments } from '../hooks/useGetComments';

export default function CommentSection() {
   const { id: postId } = useParams();

   const { data: comments = [] } = useGetComments(postId!);

   return (
      <div className="mt-20 space-y-8">
         <Count commentCount={comments.length} />
         <Form postId={postId!} />
         <List comments={comments} />
      </div>
   );
}
