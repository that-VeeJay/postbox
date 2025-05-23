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
