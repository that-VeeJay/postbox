import { useParams } from 'react-router-dom';
import Form from './Form';
import { List } from './List';

export default function CommentSection() {
   const { id: postId } = useParams();

   return (
      <div className="space-y-10">
         <Form postId={postId!} />
         <List postId={postId!} />
      </div>
   );
}
