import { useState } from "react";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/icons/Spinner";
import FormInput from "@/components/shared/FormInput";
import InputFieldError from "@/components/shared/InputFieldError";
import CustomToast from "@/components/shared/CustomToast";

import { useRegisterMutation } from "../hooks/useRegisterMutation";
import type { RegisterErrorMessageType, RegisterFormDataType } from "../auth";

export const initialValues: RegisterFormDataType = {
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function RegisterForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<RegisterErrorMessageType | null>(null);
  const [networkError, setNetworkError] = useState("");

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const { register, isPending } = useRegisterMutation({
    setErrors,
    setFormData,
    setNetworkError,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <>
      {networkError && <CustomToast message={networkError} type="error" />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <FormInput
            label="Name"
            type="text"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
          {errors?.name && <InputFieldError error={errors.name[0]} />}
        </div>

        <div>
          <FormInput
            label="Username"
            type="text"
            id="username"
            placeholder="your_username"
            value={formData.username}
            onChange={handleChange}
            prefix="@"
          />
          {errors?.username && <InputFieldError error={errors.username[0]} />}
        </div>

        <div>
          <FormInput
            label="Email"
            type="text"
            id="email"
            placeholder="name@example.com"
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
            placeholder="••••••••••••••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          {errors?.password && <InputFieldError error={errors.password[0]} />}
        </div>

        <div>
          <FormInput
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            placeholder="••••••••••••••••••••"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full py-6" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner />
              Creating account...
            </div>
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
    </>
  );
}
