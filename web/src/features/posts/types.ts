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

export type CreateInputDataProps = {
  title: string;
  body: string;
  category: string;
  image: File | null;
};

export type CreateErrorsType = {
  title?: string;
  body?: string;
  category?: string;
  image?: string;
};

export type RefineDialogBoxProps = {
  setRefinements: React.Dispatch<React.SetStateAction<{ text: string }>>;
};
