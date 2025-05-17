import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/icons/Spinner";
import { UserContext } from "@/context/UserContext";
import FormInput from "@/components/shared/FormInput";
import InputFieldError from "@/components/shared/InputFieldError";
import { useMutation } from "@tanstack/react-query";

type LoginFormType = Record<"email" | "password", string>;
type ErrorMessageType = Partial<Record<keyof LoginFormType, string[]>>;

const initialValues: LoginFormType = {
  email: "",
  password: "",
};

const loginUser = async (user: LoginFormType) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useContext(UserContext);
  const [formData, setFormData] = useState<LoginFormType>(initialValues);
  const [errors, setErrors] = useState<ErrorMessageType | null>(null);
  const [networkError, setNetworkError] = useState("");

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // display sonner success message only when registration is successful
  useEffect(() => {
    if (location.state && "success" in location.state) {
      toast.success(location.state.success, {
        position: "bottom-right",
      });
    }
  }, [location.state]);

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
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
      setNetworkError(`Login failed. Please try again later`);
    },
  });

  // handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="w-[500px] space-y-5 rounded-lg p-12 md:bg-white md:shadow-lg dark:bg-neutral-900">
        <div>
          <h1 className="text-2xl font-semibold">Log in to your account</h1>
          <p className="text-sm text-neutral-500">
            Welcome back! Please enter your details.
          </p>
        </div>
        {networkError && (
          <div className="border-2 border-red-900 bg-red-900/50 p-3 text-center">
            {networkError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FormInput
              label="Email"
              type="text"
              id="email"
              placeholder="name@gmail.com"
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
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors?.password && <InputFieldError error={errors.password[0]} />}
          </div>
          <Button className="w-full py-6" disabled={isPending}>
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

        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold hover:underline">
              Signup
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
