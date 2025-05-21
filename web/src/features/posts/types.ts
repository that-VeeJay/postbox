export type PostType = {
  id: number;
  user_id: number;
  category: string;
  title: string;
  body: string;
  image: string;
  created_at: string;
  user: {
    name: string;
    profile_picture: string;
  };
};

export type ActionsButtonPropsType = {
  id: string | undefined;
  token: string | null;
};
