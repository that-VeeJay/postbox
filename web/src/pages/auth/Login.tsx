import { Link } from "react-router-dom";
import { LoginForm } from "@/features/auth/Index";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="w-[500px] space-y-5 rounded-lg p-12 md:bg-white md:shadow-lg dark:bg-neutral-900">
        <div>
          <h1 className="text-2xl font-semibold">Log in to your account</h1>
          <p className="text-sm text-neutral-500">
            Welcome back! Please enter your details.
          </p>
        </div>
        <LoginForm />
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
