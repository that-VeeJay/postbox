import { useState } from "react";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/icons/Spinner";
import FormInput from "@/components/shared/FormInput";
import InputFieldError from "@/components/shared/InputFieldError";
import CustomToast from "@/components/shared/CustomToast";

import useToast from "@/hooks/useToast";

import { useLoginMutation } from "..";
import type { LoginErrorMessageType, LoginFormDataType } from "../types";

export const initialValues: LoginFormDataType = { email: "", password: "" };

export default function LoginForm() {
  useToast("success");
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<LoginErrorMessageType | null>(null);
  const [networkError, setNetworkError] = useState("");

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const { login, isPending } = useLoginMutation({
    setErrors,
    setFormData,
    setNetworkError,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      {networkError && <CustomToast message={networkError} type="error" />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <FormInput
            label="Email"
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.email && <InputFieldError error={errors.email[0]} />}
        </div>

        <div>
          <FormInput
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors?.password && <InputFieldError error={errors.password[0]} />}
        </div>

        <Button disabled={isPending} className="w-full py-6">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner />
              Logging in...
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </>
  );
}
