export type PostType = {
   id: number;
   user_id: number;
   category: string;
   title: string;
   slug: string;
   body: string;
   image: string;
   created_at: string;
   user: {
      name: string;
      profile_picture: string;
      username: string;
      bio: string;
   };
};

export type HeroProps = {
   title: string;
   image: string;
   category: string;
    slug: string;
   created_at: string | Date;
   user: {
      name: string;
      profile_picture: string;
      username: string;
   };
};

export type ActionsButtonPropsType = {
   slug: string;
   id?: string | undefined;
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
