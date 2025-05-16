import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/icons/Spinner";
import FormInput from "@/components/shared/FormInput";
import InputFieldError from "@/components/shared/InputFieldError";

type FormField =
  | "name"
  | "username"
  | "email"
  | "password"
  | "password_confirmation";

type RegisterFormType = {
  [key in FormField]: string;
};

type ErrorMessagesType = {
  [key in FormField]?: string;
};

const initialValues: RegisterFormType = {
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormType>(initialValues);
  const [errors, setErrors] = useState<ErrorMessagesType>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errors) {
        setErrors(data.errors);
        return;
      } else {
        setFormData(initialValues);
        setErrors({});
        navigate("/login", {
          state: { success: "Account created successfully!" },
        });
      }
    } catch (error) {
      console.error("Registration failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="w-[500px] space-y-5 overflow-hidden rounded-lg p-12 md:bg-white md:shadow-lg dark:bg-neutral-900">
        <div className="z-10">
          <h1 className="text-2xl font-semibold">Create a new account</h1>
          <p className="text-sm text-neutral-500">
            To use postbox, please enter your details.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FormInput
              label="Name"
              type="text"
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <InputFieldError error={errors.name[0]} />}
          </div>

          <div>
            <FormInput
              label="Username"
              type="text"
              id="username"
              placeholder="@your_username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <InputFieldError error={errors.username[0]} />}
          </div>

          <div>
            <FormInput
              label="Email"
              type="text"
              id="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <InputFieldError error={errors.email[0]} />}
          </div>

          <div>
            <FormInput
              label="Password"
              type="password"
              id="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <InputFieldError error={errors.password[0]} />}
          </div>

          <div>
            <FormInput
              label="Confirm Password"
              type="password"
              id="password_confirmation"
              placeholder="••••••••••••"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <Button className="w-full py-6" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Create account"}
          </Button>
        </form>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
