import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="name@email.com"
            className="mt-1 w-full rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••••••"
            className="mt-1 w-full rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800"
          />
        </div>

        <Button className="w-full py-6">Login</Button>
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
