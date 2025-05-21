export type LoginFormDataType = {
  email: string;
  password: string;
};

export type ErrorMessageType = Partial<Record<keyof LoginFormDataType, string[]>>;
