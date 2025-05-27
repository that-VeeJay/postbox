export type CommentType = {
   id: string;
   body: string;
   created_at: string;
   updated_at: string;
   user: {
      id: string;
      name: string;
      username: string;
      profile_picture: string;
   };
};
