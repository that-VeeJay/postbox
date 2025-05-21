// Login Form Types

export type LoginFormDataType = {
  email: string;
  password: string;
};

export type LoginErrorMessageType = Partial<
  Record<keyof LoginFormDataType, string[]>
>;

// Register Form Types

export type RegisterFormDataType = {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: "";
};

export type RegisterErrorMessageType = Partial<
  Record<keyof RegisterFormDataType, string[]>
>;
