export type CommentType = {
   id: string;
   body: string;
   created_at: string;
   user: {
      name: string;
      username: string;
      profile_picture: string;
   };
};
