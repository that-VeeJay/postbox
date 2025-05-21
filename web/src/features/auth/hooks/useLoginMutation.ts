import { useMutation } from "@tanstack/react-query";
import type { LoginFormDataType, LoginErrorMessageType } from "../auth";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { initialValues } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

type Props = {
  setErrors: React.Dispatch<React.SetStateAction<LoginErrorMessageType | null>>;
  setFormData: React.Dispatch<React.SetStateAction<LoginFormDataType>>;
  setNetworkError: React.Dispatch<React.SetStateAction<string>>;
};

export function useLoginMutation({
  setErrors,
  setFormData,
  setNetworkError,
}: Props) {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const mutation = useMutation({
    mutationFn: async (formData: LoginFormDataType) => {
      const response = await fetch("/api/login", {
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
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setFormData(initialValues);
        setErrors(null);
        navigate("/");
      }
    },
    onError: () => {
      setNetworkError("Login failed. Please try again later.");
    },
  });
  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
  };
}
