import { Link } from "react-router-dom";
import { RegisterForm } from "@/features/auth";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="w-[500px] space-y-5 overflow-hidden rounded-lg p-12 md:bg-white md:shadow-lg dark:bg-neutral-900">
        <div className="z-10">
          <h1 className="text-2xl font-semibold">Create a new account</h1>
          <p className="text-sm text-neutral-500">
            To use postbox, please enter your details.
          </p>
        </div>
        <RegisterForm />
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
