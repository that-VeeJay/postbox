import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { initialValues } from "../components/RegisterForm";
import type { RegisterErrorMessageType, RegisterFormDataType } from "../types";

type Props = {
  setErrors: React.Dispatch<
    React.SetStateAction<RegisterErrorMessageType | null>
  >;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormDataType>>;
  setNetworkError: React.Dispatch<React.SetStateAction<string>>;
};

export function useRegisterMutation({
  setErrors,
  setFormData,
  setNetworkError,
}: Props) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: RegisterFormDataType) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.errors) {
        setErrors(data.errors);
        return;
      }
      setFormData(initialValues);
      navigate("/login", {
        state: {
          success: "Account created successfully! 🎉",
        },
      });
    },
    onError: () => {
      setNetworkError("Registration failed. Please try again later.");
    },
  });

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
  };
}
