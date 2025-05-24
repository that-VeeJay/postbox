export type CommentType = {
   id: number;
   post_id: number;
   user_id: number;
   body: string;
   parent_id: number | null;
   created_at: string;
   updated_at: string;
   user: {
      id: number;
      name: string;
      username: string;
      profile_picture: string;
   };
};

export type CommentItemProps = {
   comment: {
      id: string;
      body: string;
      is_edited: boolean;
      created_at: string;
      user: { id: string; name: string; username: string; profile_picture: string };
   };
};
